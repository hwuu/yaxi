#
# Copyright (c) 2015 SAP AG.
# Author: Hao Wu (michael.wu02@sap.com)
#
# Yaxi Web Service
#
# Created: 02/06/2015, modified: 02/06/2015
#

from flask import Flask, render_template, request, jsonify

#
##
#

_app = Flask(__name__)

#
##
#

@_app.route('/')
def handle_root():
    return render_template("index.html")

#
##
#

@_app.route('/yaxis')
def handle_query():
    #
    q = request.args.get("q", "", type=str)
    k = request.args.get("k", 10, type=int)
    p = request.args.get("p", 0, type=int)
    #
    v_row = []
    for i in range(0, 10):
        row = {
                "title": "%s - %d" % (q, i),
                "url": "http://%s.com/%d" % (q, i),
                "snippet": "Snippet of '%s - %d'." % (q, i)}
        v_row.append(row)
    #
    return jsonify({"answers": v_row})

#
##
#

if __name__ == '__main__':
    #
    _app.run(host='0.0.0.0', port=5000, debug=True)

#
##
###
##
#

