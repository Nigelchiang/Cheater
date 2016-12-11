from flask import request

from . import main


@main.route('/q')
def query():
    return 'get ' + request.args.get('q', '<NOTHING>')
