from flask import Flask, request, jsonify, send_from_directory
from yt_dlp import YoutubeDL
from flask_cors import CORS

app = Flask(__name__, static_folder='.', template_folder='.')
CORS(app)


# Serve index.html at root
@app.route('/')
def serve_home():
    return send_from_directory('.', 'index.html')


# Serve static files (script.js, style.css, etc.)
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)


# Video/audio downloader route
@app.route('/download', methods=['POST'])
def download_video():
    data = request.get_json()
    url = data.get('url')
    mode = data.get('mode', 'video')  # default is video

    if not url:
        return jsonify({'success': False, 'error': 'URL is required'}), 400

    try:
        # Dynamic options based on mode
        if mode == 'audio':
            ydl_opts = {
                'format':
                'bestaudio/best',
                'noplaylist':
                True,
                'quiet':
                True,
                'extract_audio':
                True,
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }],
                'forceurl':
                True,
                'simulate':
                True,
                'forcejson':
                True,
                'headers': {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Mobile)',
                }
            }
        else:  # video
            ydl_opts = {
                'format': 'best',
                'noplaylist': True,
                'quiet': True,
                'forceurl': True,
                'simulate': True,
                'forcejson': True,
                'headers': {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Mobile)',
                }
            }

        # Extract video/audio info
        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            return jsonify({
                'success': True,
                'title': info.get('title', 'Untitled'),
                'thumbnail': info.get('thumbnail'),
                'download_url': info.get('url'),
                'mode': mode
            })

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Download failed. Check the URL.'
        }), 500


# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
