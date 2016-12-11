class Config:
    DB_HOST = 'localhost'
    DB_DATABASE = 'cheater'
    DB_USERNAME = "john"
    DB_PASSWORD = "john"

    @classmethod
    def init_app(cls, app):
        app.config.from_object(cls)


config = {
    "dev"    : Config,
    "default": Config
}
