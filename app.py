# app.py

# Step 1: Import necessary libraries
# Zaroori libraries ko import karna
from flask import Flask, request, jsonify
from yt_dlp import YoutubeDL
from flask_cors import CORS

# Step 2: Initialize the Flask app
# Flask app shuru karna
app = Flask(__name__)
# CORS ko enable karna taaki aapki frontend website isse connect kar sake
CORS(app) 

# Step 3: Create a route for downloading
# '/download' naam ka ek API endpoint banana
@app.route('/download', methods=['POST'])
def download_video():
    # Frontend se bheje gaye JSON data se URL nikalna
    data = request.get_json()
    url = data.get('url')

    # Agar URL nahi hai to error bhejna
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    try:
        # yt-dlp library ka istemal karke video ki info nikalna
        ydl_opts = {
            'format': 'best',
            'noplaylist': True,
        }
        with YoutubeDL(ydl_opts) as ydl:
            # Hum video download nahi kar rahe, sirf uski jaankari nikal rahe hain
            info = ydl.extract_info(url, download=False)
            
            # Video ka direct download link, title, aur thumbnail nikalna
            video_url = info.get('url')
            title = info.get('title', 'video')
            thumbnail = info.get('thumbnail')

            # Frontend ko bhejne ke liye response taiyar karna
            response_data = {
                'success': True,
                'title': title,
                'thumbnail': thumbnail,
                'download_url': video_url
            }
            return jsonify(response_data)

    except Exception as e:
        # Agar koi error aaye to use frontend ko bhejna
        print(f"Error: {str(e)}")
        return jsonify({'success': False, 'error': f'Video process nahi ho saka. Shayad URL galat hai.'}), 500

# Ye line server ko run karti hai (Hosting ke liye zaroori)
if __name__ == '__main__':
    # Production ke liye host='0.0.0.0' zaroori hai
    app.run(host='0.0.0.0', port=5000)
