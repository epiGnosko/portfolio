from http.server import BaseHTTPRequestHandler
import json

HUGE_LIST = sorted(["apple", "zebra", "banana", "mango", "cherry"] * 20000)

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response_payload = json.dumps({"data": HUGE_LIST})
        self.wfile.write(response_payload.encode('utf-8'))
        return
