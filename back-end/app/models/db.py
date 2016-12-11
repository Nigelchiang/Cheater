from pymysql.connections import Connection

conn = None


def init_app(app):
    global conn
    if not conn:
        conn = Connection(host=app.config['DB_HOST'],
                          user=app.config['DB_USERNAME'],
                          password=app.config['DB_PASSWORD'],
                          database=app.config['DB_DATABASE'],
                          charset='utf8')
