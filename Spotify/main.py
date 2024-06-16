from http.server import HTTPServer,  BaseHTTPRequestHandler

class helloHondler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('content-type', 'text.html')
        self.end_headers()
        self.wfile.write('HELLO WORLD'.encode())

def main():
    PORT =  8000
    server = HTTPServer(('', PORT), helloHondler)
    print('Server running on port %s' % PORT)
    server