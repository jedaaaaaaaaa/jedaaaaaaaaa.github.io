/*! URI.js v1.19.1 http://medialize.github.io/URI.js/ */
/* build contains: IPv6.js, URI.js, URI.fragmentQuery.js */
/*
 URI.js - Mutating URLs
 IPv6 Support

 Version: 1.19.1

 Author: Rodney Rehm
 Web: http://medialize.github.io/URI.js/

 Licensed under
   MIT License http://www.opensource.org/licenses/mit-license

 URI.js - Mutating URLs

 Version: 1.19.1

 Author: Rodney Rehm
 Web: http://medialize.github.io/URI.js/

 Licensed under
   MIT License http://www.opensource.org/licenses/mit-license

*/
(function (h, l) { "object" === typeof module && module.exports ? module.exports = l() : "function" === typeof define && define.amd ? define(l) : h.IPv6 = l(h) })(this, function (h) {
    var l = h && h.IPv6; return {
        best: function (h) {
            h = h.toLowerCase().split(":"); var m = h.length, d = 8; "" === h[0] && "" === h[1] && "" === h[2] ? (h.shift(), h.shift()) : "" === h[0] && "" === h[1] ? h.shift() : "" === h[m - 1] && "" === h[m - 2] && h.pop(); m = h.length; -1 !== h[m - 1].indexOf(".") && (d = 7); var k; for (k = 0; k < m && "" !== h[k]; k++); if (k < d) for (h.splice(k, 1, "0000"); h.length < d;)h.splice(k, 0, "0000");
            for (k = 0; k < d; k++) { m = h[k].split(""); for (var p = 0; 3 > p; p++)if ("0" === m[0] && 1 < m.length) m.splice(0, 1); else break; h[k] = m.join("") } m = -1; var n = p = 0, l = -1, q = !1; for (k = 0; k < d; k++)q ? "0" === h[k] ? n += 1 : (q = !1, n > p && (m = l, p = n)) : "0" === h[k] && (q = !0, l = k, n = 1); n > p && (m = l, p = n); 1 < p && h.splice(m, p, ""); m = h.length; d = ""; "" === h[0] && (d = ":"); for (k = 0; k < m; k++) { d += h[k]; if (k === m - 1) break; d += ":" } "" === h[m - 1] && (d += ":"); return d
        }, noConflict: function () { h.IPv6 === this && (h.IPv6 = l); return this }
    }
});
(function (h, l) { "object" === typeof module && module.exports ? module.exports = l(require("./punycode"), require("./IPv6"), require("./SecondLevelDomains")) : "function" === typeof define && define.amd ? define(["./punycode", "./IPv6", "./SecondLevelDomains"], l) : h.URI = l(h.punycode, h.IPv6, h.SecondLevelDomains, h) })(this, function (h, l, q, m) {
    function d(a, b) {
        var c = 1 <= arguments.length, e = 2 <= arguments.length; if (!(this instanceof d)) return c ? e ? new d(a, b) : new d(a) : new d; if (void 0 === a) {
            if (c) throw new TypeError("undefined is not a valid argument for URI");
            a = "undefined" !== typeof location ? location.href + "" : ""
        } if (null === a && c) throw new TypeError("null is not a valid argument for URI"); this.href(a); return void 0 !== b ? this.absoluteTo(b) : this
    } function k(a) { return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") } function p(a) { return void 0 === a ? "Undefined" : String(Object.prototype.toString.call(a)).slice(8, -1) } function n(a) { return "Array" === p(a) } function A(a, b) {
        var c = {}, d; if ("RegExp" === p(b)) c = null; else if (n(b)) { var f = 0; for (d = b.length; f < d; f++)c[b[f]] = !0 } else c[b] =
            !0; f = 0; for (d = a.length; f < d; f++)if (c && void 0 !== c[a[f]] || !c && b.test(a[f])) a.splice(f, 1), d-- , f--; return a
    } function u(a, b) { var c; if (n(b)) { var d = 0; for (c = b.length; d < c; d++)if (!u(a, b[d])) return !1; return !0 } var f = p(b); d = 0; for (c = a.length; d < c; d++)if ("RegExp" === f) { if ("string" === typeof a[d] && a[d].match(b)) return !0 } else if (a[d] === b) return !0; return !1 } function B(a, b) { if (!n(a) || !n(b) || a.length !== b.length) return !1; a.sort(); b.sort(); for (var c = 0, d = a.length; c < d; c++)if (a[c] !== b[c]) return !1; return !0 } function x(a) {
        return a.replace(/^\/+|\/+$/g,
            "")
    } function D(a) { return escape(a) } function y(a) { return encodeURIComponent(a).replace(/[!'()*]/g, D).replace(/\*/g, "%2A") } function v(a) { return function (b, c) { if (void 0 === b) return this._parts[a] || ""; this._parts[a] = b || null; this.build(!c); return this } } function C(a, b) { return function (c, d) { if (void 0 === c) return this._parts[a] || ""; null !== c && (c += "", c.charAt(0) === b && (c = c.substring(1))); this._parts[a] = c; this.build(!d); return this } } var E = m && m.URI; d.version = "1.19.1"; var g = d.prototype, r = Object.prototype.hasOwnProperty;
    d._parts = function () { return { protocol: null, username: null, password: null, hostname: null, urn: null, port: null, path: null, query: null, fragment: null, preventInvalidHostname: d.preventInvalidHostname, duplicateQueryParameters: d.duplicateQueryParameters, escapeQuerySpace: d.escapeQuerySpace } }; d.preventInvalidHostname = !1; d.duplicateQueryParameters = !1; d.escapeQuerySpace = !0; d.protocol_expression = /^[a-z][a-z0-9.+-]*$/i; d.idn_expression = /[^a-z0-9\._-]/i; d.punycode_expression = /(xn--)/i; d.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    d.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    d.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig; d.findUri = { start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi, end: /[\s\r\n]|$/, trim: /[`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u201e\u2018\u2019]+$/, parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g }; d.defaultPorts = {
        http: "80", https: "443", ftp: "21",
        gopher: "70", ws: "80", wss: "443"
    }; d.hostProtocols = ["http", "https"]; d.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/; d.domAttributes = { a: "href", blockquote: "cite", link: "href", base: "href", script: "src", form: "action", img: "src", area: "href", iframe: "src", embed: "src", source: "src", track: "src", input: "src", audio: "src", video: "src" }; d.getDomAttribute = function (a) { if (a && a.nodeName) { var b = a.nodeName.toLowerCase(); if ("input" !== b || "image" === a.type) return d.domAttributes[b] } }; d.encode = y; d.decode = decodeURIComponent; d.iso8859 =
        function () { d.encode = escape; d.decode = unescape }; d.unicode = function () { d.encode = y; d.decode = decodeURIComponent }; d.characters = {
            pathname: { encode: { expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig, map: { "%24": "$", "%26": "&", "%2B": "+", "%2C": ",", "%3B": ";", "%3D": "=", "%3A": ":", "%40": "@" } }, decode: { expression: /[\/\?#]/g, map: { "/": "%2F", "?": "%3F", "#": "%23" } } }, reserved: {
                encode: {
                    expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig, map: {
                        "%3A": ":", "%2F": "/", "%3F": "?", "%23": "#", "%5B": "[", "%5D": "]", "%40": "@",
                        "%21": "!", "%24": "$", "%26": "&", "%27": "'", "%28": "(", "%29": ")", "%2A": "*", "%2B": "+", "%2C": ",", "%3B": ";", "%3D": "="
                    }
                }
            }, urnpath: { encode: { expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig, map: { "%21": "!", "%24": "$", "%27": "'", "%28": "(", "%29": ")", "%2A": "*", "%2B": "+", "%2C": ",", "%3B": ";", "%3D": "=", "%40": "@" } }, decode: { expression: /[\/\?#:]/g, map: { "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" } } }
        }; d.encodeQuery = function (a, b) { var c = d.encode(a + ""); void 0 === b && (b = d.escapeQuerySpace); return b ? c.replace(/%20/g, "+") : c }; d.decodeQuery =
            function (a, b) { a += ""; void 0 === b && (b = d.escapeQuerySpace); try { return d.decode(b ? a.replace(/\+/g, "%20") : a) } catch (c) { return a } }; var t = { encode: "encode", decode: "decode" }, w, z = function (a, b) { return function (c) { try { return d[b](c + "").replace(d.characters[a][b].expression, function (c) { return d.characters[a][b].map[c] }) } catch (e) { return c } } }; for (w in t) d[w + "PathSegment"] = z("pathname", t[w]), d[w + "UrnPathSegment"] = z("urnpath", t[w]); t = function (a, b, c) {
                return function (e) {
                    var f = c ? function (a) { return d[b](d[c](a)) } : d[b];
                    e = (e + "").split(a); for (var g = 0, h = e.length; g < h; g++)e[g] = f(e[g]); return e.join(a)
                }
            }; d.decodePath = t("/", "decodePathSegment"); d.decodeUrnPath = t(":", "decodeUrnPathSegment"); d.recodePath = t("/", "encodePathSegment", "decode"); d.recodeUrnPath = t(":", "encodeUrnPathSegment", "decode"); d.encodeReserved = z("reserved", "encode"); d.parse = function (a, b) {
                b || (b = { preventInvalidHostname: d.preventInvalidHostname }); var c = a.indexOf("#"); -1 < c && (b.fragment = a.substring(c + 1) || null, a = a.substring(0, c)); c = a.indexOf("?"); -1 < c && (b.query =
                    a.substring(c + 1) || null, a = a.substring(0, c)); "//" === a.substring(0, 2) ? (b.protocol = null, a = a.substring(2), a = d.parseAuthority(a, b)) : (c = a.indexOf(":"), -1 < c && (b.protocol = a.substring(0, c) || null, b.protocol && !b.protocol.match(d.protocol_expression) ? b.protocol = void 0 : "//" === a.substring(c + 1, c + 3) ? (a = a.substring(c + 3), a = d.parseAuthority(a, b)) : (a = a.substring(c + 1), b.urn = !0))); b.path = a; return b
            }; d.parseHost = function (a, b) {
                a || (a = ""); a = a.replace(/\\/g, "/"); var c = a.indexOf("/"); -1 === c && (c = a.length); if ("[" === a.charAt(0)) {
                    var e =
                        a.indexOf("]"); b.hostname = a.substring(1, e) || null; b.port = a.substring(e + 2, c) || null; "/" === b.port && (b.port = null)
                } else { var f = a.indexOf(":"); e = a.indexOf("/"); f = a.indexOf(":", f + 1); -1 !== f && (-1 === e || f < e) ? (b.hostname = a.substring(0, c) || null, b.port = null) : (e = a.substring(0, c).split(":"), b.hostname = e[0] || null, b.port = e[1] || null) } b.hostname && "/" !== a.substring(c).charAt(0) && (c++ , a = "/" + a); b.preventInvalidHostname && d.ensureValidHostname(b.hostname, b.protocol); b.port && d.ensureValidPort(b.port); return a.substring(c) ||
                    "/"
            }; d.parseAuthority = function (a, b) { a = d.parseUserinfo(a, b); return d.parseHost(a, b) }; d.parseUserinfo = function (a, b) { var c = a.indexOf("/"), e = a.lastIndexOf("@", -1 < c ? c : a.length - 1); -1 < e && (-1 === c || e < c) ? (c = a.substring(0, e).split(":"), b.username = c[0] ? d.decode(c[0]) : null, c.shift(), b.password = c[0] ? d.decode(c.join(":")) : null, a = a.substring(e + 1)) : (b.username = null, b.password = null); return a }; d.parseQuery = function (a, b) {
                if (!a) return {}; a = a.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, ""); if (!a) return {}; for (var c = {}, e = a.split("&"),
                    f = e.length, g, h, k = 0; k < f; k++)if (g = e[k].split("="), h = d.decodeQuery(g.shift(), b), g = g.length ? d.decodeQuery(g.join("="), b) : null, r.call(c, h)) { if ("string" === typeof c[h] || null === c[h]) c[h] = [c[h]]; c[h].push(g) } else c[h] = g; return c
            }; d.build = function (a) {
                var b = ""; a.protocol && (b += a.protocol + ":"); a.urn || !b && !a.hostname || (b += "//"); b += d.buildAuthority(a) || ""; "string" === typeof a.path && ("/" !== a.path.charAt(0) && "string" === typeof a.hostname && (b += "/"), b += a.path); "string" === typeof a.query && a.query && (b += "?" + a.query); "string" ===
                    typeof a.fragment && a.fragment && (b += "#" + a.fragment); return b
            }; d.buildHost = function (a) { var b = ""; if (a.hostname) b = d.ip6_expression.test(a.hostname) ? b + ("[" + a.hostname + "]") : b + a.hostname; else return ""; a.port && (b += ":" + a.port); return b }; d.buildAuthority = function (a) { return d.buildUserinfo(a) + d.buildHost(a) }; d.buildUserinfo = function (a) { var b = ""; a.username && (b += d.encode(a.username)); a.password && (b += ":" + d.encode(a.password)); b && (b += "@"); return b }; d.buildQuery = function (a, b, c) {
                var e = "", f, g; for (f in a) if (r.call(a,
                    f) && f) if (n(a[f])) { var h = {}; var k = 0; for (g = a[f].length; k < g; k++)void 0 !== a[f][k] && void 0 === h[a[f][k] + ""] && (e += "&" + d.buildQueryParameter(f, a[f][k], c), !0 !== b && (h[a[f][k] + ""] = !0)) } else void 0 !== a[f] && (e += "&" + d.buildQueryParameter(f, a[f], c)); return e.substring(1)
            }; d.buildQueryParameter = function (a, b, c) { return d.encodeQuery(a, c) + (null !== b ? "=" + d.encodeQuery(b, c) : "") }; d.addQuery = function (a, b, c) {
                if ("object" === typeof b) for (var e in b) r.call(b, e) && d.addQuery(a, e, b[e]); else if ("string" === typeof b) void 0 === a[b] ?
                    a[b] = c : ("string" === typeof a[b] && (a[b] = [a[b]]), n(c) || (c = [c]), a[b] = (a[b] || []).concat(c)); else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
            }; d.setQuery = function (a, b, c) { if ("object" === typeof b) for (var e in b) r.call(b, e) && d.setQuery(a, e, b[e]); else if ("string" === typeof b) a[b] = void 0 === c ? null : c; else throw new TypeError("URI.setQuery() accepts an object, string as the name parameter"); }; d.removeQuery = function (a, b, c) {
                var e; if (n(b)) for (c = 0, e = b.length; c < e; c++)a[b[c]] =
                    void 0; else if ("RegExp" === p(b)) for (e in a) b.test(e) && (a[e] = void 0); else if ("object" === typeof b) for (e in b) r.call(b, e) && d.removeQuery(a, e, b[e]); else if ("string" === typeof b) void 0 !== c ? "RegExp" === p(c) ? !n(a[b]) && c.test(a[b]) ? a[b] = void 0 : a[b] = A(a[b], c) : a[b] !== String(c) || n(c) && 1 !== c.length ? n(a[b]) && (a[b] = A(a[b], c)) : a[b] = void 0 : a[b] = void 0; else throw new TypeError("URI.removeQuery() accepts an object, string, RegExp as the first parameter");
            }; d.hasQuery = function (a, b, c, e) {
                switch (p(b)) {
                    case "String": break;
                    case "RegExp": for (var f in a) if (r.call(a, f) && b.test(f) && (void 0 === c || d.hasQuery(a, f, c))) return !0; return !1; case "Object": for (var g in b) if (r.call(b, g) && !d.hasQuery(a, g, b[g])) return !1; return !0; default: throw new TypeError("URI.hasQuery() accepts a string, regular expression or object as the name parameter");
                }switch (p(c)) {
                    case "Undefined": return b in a; case "Boolean": return a = !(n(a[b]) ? !a[b].length : !a[b]), c === a; case "Function": return !!c(a[b], b, a); case "Array": return n(a[b]) ? (e ? u : B)(a[b], c) : !1; case "RegExp": return n(a[b]) ?
                        e ? u(a[b], c) : !1 : !(!a[b] || !a[b].match(c)); case "Number": c = String(c); case "String": return n(a[b]) ? e ? u(a[b], c) : !1 : a[b] === c; default: throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter");
                }
            }; d.joinPaths = function () {
                for (var a = [], b = [], c = 0, e = 0; e < arguments.length; e++) { var f = new d(arguments[e]); a.push(f); f = f.segment(); for (var g = 0; g < f.length; g++)"string" === typeof f[g] && b.push(f[g]), f[g] && c++ } if (!b.length || !c) return new d(""); b = (new d("")).segment(b);
                "" !== a[0].path() && "/" !== a[0].path().slice(0, 1) || b.path("/" + b.path()); return b.normalize()
            }; d.commonPath = function (a, b) { var c = Math.min(a.length, b.length), d; for (d = 0; d < c; d++)if (a.charAt(d) !== b.charAt(d)) { d--; break } if (1 > d) return a.charAt(0) === b.charAt(0) && "/" === a.charAt(0) ? "/" : ""; if ("/" !== a.charAt(d) || "/" !== b.charAt(d)) d = a.substring(0, d).lastIndexOf("/"); return a.substring(0, d + 1) }; d.withinString = function (a, b, c) {
                c || (c = {}); var e = c.start || d.findUri.start, f = c.end || d.findUri.end, g = c.trim || d.findUri.trim, h =
                    c.parens || d.findUri.parens, k = /[a-z0-9-]=["']?$/i; for (e.lastIndex = 0; ;) {
                        var n = e.exec(a); if (!n) break; var m = n.index; if (c.ignoreHtml) { var l = a.slice(Math.max(m - 3, 0), m); if (l && k.test(l)) continue } var p = m + a.slice(m).search(f); l = a.slice(m, p); for (p = -1; ;) { var q = h.exec(l); if (!q) break; p = Math.max(p, q.index + q[0].length) } l = -1 < p ? l.slice(0, p) + l.slice(p).replace(g, "") : l.replace(g, ""); l.length <= n[0].length || c.ignore && c.ignore.test(l) || (p = m + l.length, n = b(l, m, p, a), void 0 === n ? e.lastIndex = p : (n = String(n), a = a.slice(0, m) + n + a.slice(p),
                            e.lastIndex = m + n.length))
                    } e.lastIndex = 0; return a
            }; d.ensureValidHostname = function (a, b) {
                var c = !!a, e = !1; b && (e = u(d.hostProtocols, b)); if (e && !c) throw new TypeError("Hostname cannot be empty, if protocol is " + b); if (a && a.match(d.invalid_hostname_characters)) {
                    if (!h) throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available'); if (h.toASCII(a).match(d.invalid_hostname_characters)) throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-:_]');
                }
            }; d.ensureValidPort = function (a) { if (a) { var b = Number(a); if (!(/^[0-9]+$/.test(b) && 0 < b && 65536 > b)) throw new TypeError('Port "' + a + '" is not a valid port'); } }; d.noConflict = function (a) {
                if (a) return a = { URI: this.noConflict() }, m.URITemplate && "function" === typeof m.URITemplate.noConflict && (a.URITemplate = m.URITemplate.noConflict()), m.IPv6 && "function" === typeof m.IPv6.noConflict && (a.IPv6 = m.IPv6.noConflict()), m.SecondLevelDomains && "function" === typeof m.SecondLevelDomains.noConflict && (a.SecondLevelDomains = m.SecondLevelDomains.noConflict()),
                    a; m.URI === this && (m.URI = E); return this
            }; g.build = function (a) { if (!0 === a) this._deferred_build = !0; else if (void 0 === a || this._deferred_build) this._string = d.build(this._parts), this._deferred_build = !1; return this }; g.clone = function () { return new d(this) }; g.valueOf = g.toString = function () { return this.build(!1)._string }; g.protocol = v("protocol"); g.username = v("username"); g.password = v("password"); g.hostname = v("hostname"); g.port = v("port"); g.query = C("query", "?"); g.fragment = C("fragment", "#"); g.search = function (a, b) {
                var c =
                    this.query(a, b); return "string" === typeof c && c.length ? "?" + c : c
            }; g.hash = function (a, b) { var c = this.fragment(a, b); return "string" === typeof c && c.length ? "#" + c : c }; g.pathname = function (a, b) { if (void 0 === a || !0 === a) { var c = this._parts.path || (this._parts.hostname ? "/" : ""); return a ? (this._parts.urn ? d.decodeUrnPath : d.decodePath)(c) : c } this._parts.path = this._parts.urn ? a ? d.recodeUrnPath(a) : "" : a ? d.recodePath(a) : "/"; this.build(!b); return this }; g.path = g.pathname; g.href = function (a, b) {
                var c; if (void 0 === a) return this.toString();
                this._string = ""; this._parts = d._parts(); var e = a instanceof d, f = "object" === typeof a && (a.hostname || a.path || a.pathname); a.nodeName && (f = d.getDomAttribute(a), a = a[f] || "", f = !1); !e && f && void 0 !== a.pathname && (a = a.toString()); if ("string" === typeof a || a instanceof String) this._parts = d.parse(String(a), this._parts); else if (e || f) { e = e ? a._parts : a; for (c in e) "query" !== c && r.call(this._parts, c) && (this._parts[c] = e[c]); e.query && this.query(e.query, !1) } else throw new TypeError("invalid input"); this.build(!b); return this
            };
    g.is = function (a) {
        var b = !1, c = !1, e = !1, f = !1, g = !1, h = !1, k = !1, n = !this._parts.urn; this._parts.hostname && (n = !1, c = d.ip4_expression.test(this._parts.hostname), e = d.ip6_expression.test(this._parts.hostname), b = c || e, g = (f = !b) && q && q.has(this._parts.hostname), h = f && d.idn_expression.test(this._parts.hostname), k = f && d.punycode_expression.test(this._parts.hostname)); switch (a.toLowerCase()) {
            case "relative": return n; case "absolute": return !n; case "domain": case "name": return f; case "sld": return g; case "ip": return b; case "ip4": case "ipv4": case "inet4": return c;
            case "ip6": case "ipv6": case "inet6": return e; case "idn": return h; case "url": return !this._parts.urn; case "urn": return !!this._parts.urn; case "punycode": return k
        }return null
    }; var F = g.protocol, G = g.port, H = g.hostname; g.protocol = function (a, b) { if (a && (a = a.replace(/:(\/\/)?$/, ""), !a.match(d.protocol_expression))) throw new TypeError('Protocol "' + a + "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]"); return F.call(this, a, b) }; g.scheme = g.protocol; g.port = function (a, b) {
        if (this._parts.urn) return void 0 ===
            a ? "" : this; void 0 !== a && (0 === a && (a = null), a && (a += "", ":" === a.charAt(0) && (a = a.substring(1)), d.ensureValidPort(a))); return G.call(this, a, b)
    }; g.hostname = function (a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 !== a) { var c = { preventInvalidHostname: this._parts.preventInvalidHostname }; if ("/" !== d.parseHost(a, c)) throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]'); a = c.hostname; this._parts.preventInvalidHostname && d.ensureValidHostname(a, this._parts.protocol) } return H.call(this,
            a, b)
    }; g.origin = function (a, b) { if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a) { var c = this.protocol(); return this.authority() ? (c ? c + "://" : "") + this.authority() : "" } c = d(a); this.protocol(c.protocol()).authority(c.authority()).build(!b); return this }; g.host = function (a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a) return this._parts.hostname ? d.buildHost(this._parts) : ""; if ("/" !== d.parseHost(a, this._parts)) throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]');
        this.build(!b); return this
    }; g.authority = function (a, b) { if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a) return this._parts.hostname ? d.buildAuthority(this._parts) : ""; if ("/" !== d.parseAuthority(a, this._parts)) throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]'); this.build(!b); return this }; g.userinfo = function (a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a) { var c = d.buildUserinfo(this._parts); return c ? c.substring(0, c.length - 1) : c } "@" !== a[a.length - 1] &&
            (a += "@"); d.parseUserinfo(a, this._parts); this.build(!b); return this
    }; g.resource = function (a, b) { if (void 0 === a) return this.path() + this.search() + this.hash(); var c = d.parse(a); this._parts.path = c.path; this._parts.query = c.query; this._parts.fragment = c.fragment; this.build(!b); return this }; g.subdomain = function (a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a) {
            if (!this._parts.hostname || this.is("IP")) return ""; var c = this._parts.hostname.length - this.domain().length - 1; return this._parts.hostname.substring(0,
                c) || ""
        } c = this._parts.hostname.length - this.domain().length; c = this._parts.hostname.substring(0, c); c = new RegExp("^" + k(c)); a && "." !== a.charAt(a.length - 1) && (a += "."); if (-1 !== a.indexOf(":")) throw new TypeError("Domains cannot contain colons"); a && d.ensureValidHostname(a, this._parts.protocol); this._parts.hostname = this._parts.hostname.replace(c, a); this.build(!b); return this
    }; g.domain = function (a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this; "boolean" === typeof a && (b = a, a = void 0); if (void 0 === a) {
            if (!this._parts.hostname ||
                this.is("IP")) return ""; var c = this._parts.hostname.match(/\./g); if (c && 2 > c.length) return this._parts.hostname; c = this._parts.hostname.length - this.tld(b).length - 1; c = this._parts.hostname.lastIndexOf(".", c - 1) + 1; return this._parts.hostname.substring(c) || ""
        } if (!a) throw new TypeError("cannot set domain empty"); if (-1 !== a.indexOf(":")) throw new TypeError("Domains cannot contain colons"); d.ensureValidHostname(a, this._parts.protocol); !this._parts.hostname || this.is("IP") ? this._parts.hostname = a : (c = new RegExp(k(this.domain()) +
            "$"), this._parts.hostname = this._parts.hostname.replace(c, a)); this.build(!b); return this
    }; g.tld = function (a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this; "boolean" === typeof a && (b = a, a = void 0); if (void 0 === a) { if (!this._parts.hostname || this.is("IP")) return ""; var c = this._parts.hostname.lastIndexOf("."); c = this._parts.hostname.substring(c + 1); return !0 !== b && q && q.list[c.toLowerCase()] ? q.get(this._parts.hostname) || c : c } if (a) if (a.match(/[^a-zA-Z0-9-]/)) if (q && q.is(a)) c = new RegExp(k(this.tld()) + "$"), this._parts.hostname =
            this._parts.hostname.replace(c, a); else throw new TypeError('TLD "' + a + '" contains characters other than [A-Z0-9]'); else { if (!this._parts.hostname || this.is("IP")) throw new ReferenceError("cannot set TLD on non-domain host"); c = new RegExp(k(this.tld()) + "$"); this._parts.hostname = this._parts.hostname.replace(c, a) } else throw new TypeError("cannot set TLD empty"); this.build(!b); return this
    }; g.directory = function (a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a || !0 === a) {
            if (!this._parts.path &&
                !this._parts.hostname) return ""; if ("/" === this._parts.path) return "/"; var c = this._parts.path.length - this.filename().length - 1; c = this._parts.path.substring(0, c) || (this._parts.hostname ? "/" : ""); return a ? d.decodePath(c) : c
        } c = this._parts.path.length - this.filename().length; c = this._parts.path.substring(0, c); c = new RegExp("^" + k(c)); this.is("relative") || (a || (a = "/"), "/" !== a.charAt(0) && (a = "/" + a)); a && "/" !== a.charAt(a.length - 1) && (a += "/"); a = d.recodePath(a); this._parts.path = this._parts.path.replace(c, a); this.build(!b);
        return this
    }; g.filename = function (a, b) { if (this._parts.urn) return void 0 === a ? "" : this; if ("string" !== typeof a) { if (!this._parts.path || "/" === this._parts.path) return ""; var c = this._parts.path.lastIndexOf("/"); c = this._parts.path.substring(c + 1); return a ? d.decodePathSegment(c) : c } c = !1; "/" === a.charAt(0) && (a = a.substring(1)); a.match(/\.?\//) && (c = !0); var e = new RegExp(k(this.filename()) + "$"); a = d.recodePath(a); this._parts.path = this._parts.path.replace(e, a); c ? this.normalizePath(b) : this.build(!b); return this }; g.suffix =
        function (a, b) {
            if (this._parts.urn) return void 0 === a ? "" : this; if (void 0 === a || !0 === a) { if (!this._parts.path || "/" === this._parts.path) return ""; var c = this.filename(), e = c.lastIndexOf("."); if (-1 === e) return ""; c = c.substring(e + 1); c = /^[a-z0-9%]+$/i.test(c) ? c : ""; return a ? d.decodePathSegment(c) : c } "." === a.charAt(0) && (a = a.substring(1)); if (c = this.suffix()) e = a ? new RegExp(k(c) + "$") : new RegExp(k("." + c) + "$"); else { if (!a) return this; this._parts.path += "." + d.recodePath(a) } e && (a = d.recodePath(a), this._parts.path = this._parts.path.replace(e,
                a)); this.build(!b); return this
        }; g.segment = function (a, b, c) {
            var d = this._parts.urn ? ":" : "/", f = this.path(), g = "/" === f.substring(0, 1); f = f.split(d); void 0 !== a && "number" !== typeof a && (c = b, b = a, a = void 0); if (void 0 !== a && "number" !== typeof a) throw Error('Bad segment "' + a + '", must be 0-based integer'); g && f.shift(); 0 > a && (a = Math.max(f.length + a, 0)); if (void 0 === b) return void 0 === a ? f : f[a]; if (null === a || void 0 === f[a]) if (n(b)) {
                f = []; a = 0; for (var h = b.length; a < h; a++)if (b[a].length || f.length && f[f.length - 1].length) f.length && !f[f.length -
                    1].length && f.pop(), f.push(x(b[a]))
            } else { if (b || "string" === typeof b) b = x(b), "" === f[f.length - 1] ? f[f.length - 1] = b : f.push(b) } else b ? f[a] = x(b) : f.splice(a, 1); g && f.unshift(""); return this.path(f.join(d), c)
        }; g.segmentCoded = function (a, b, c) {
            var e; "number" !== typeof a && (c = b, b = a, a = void 0); if (void 0 === b) { a = this.segment(a, b, c); if (n(a)) { var f = 0; for (e = a.length; f < e; f++)a[f] = d.decode(a[f]) } else a = void 0 !== a ? d.decode(a) : void 0; return a } if (n(b)) for (f = 0, e = b.length; f < e; f++)b[f] = d.encode(b[f]); else b = "string" === typeof b || b instanceof
                String ? d.encode(b) : b; return this.segment(a, b, c)
        }; var I = g.query; g.query = function (a, b) {
            if (!0 === a) return d.parseQuery(this._parts.query, this._parts.escapeQuerySpace); if ("function" === typeof a) { var c = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace), e = a.call(this, c); this._parts.query = d.buildQuery(e || c, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace); this.build(!b); return this } return void 0 !== a && "string" !== typeof a ? (this._parts.query = d.buildQuery(a, this._parts.duplicateQueryParameters,
                this._parts.escapeQuerySpace), this.build(!b), this) : I.call(this, a, b)
        }; g.setQuery = function (a, b, c) {
            var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace); if ("string" === typeof a || a instanceof String) e[a] = void 0 !== b ? b : null; else if ("object" === typeof a) for (var f in a) r.call(a, f) && (e[f] = a[f]); else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter"); this._parts.query = d.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace); "string" !== typeof a &&
                (c = b); this.build(!c); return this
        }; g.addQuery = function (a, b, c) { var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace); d.addQuery(e, a, void 0 === b ? null : b); this._parts.query = d.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace); "string" !== typeof a && (c = b); this.build(!c); return this }; g.removeQuery = function (a, b, c) {
            var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace); d.removeQuery(e, a, b); this._parts.query = d.buildQuery(e, this._parts.duplicateQueryParameters,
                this._parts.escapeQuerySpace); "string" !== typeof a && (c = b); this.build(!c); return this
        }; g.hasQuery = function (a, b, c) { var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace); return d.hasQuery(e, a, b, c) }; g.setSearch = g.setQuery; g.addSearch = g.addQuery; g.removeSearch = g.removeQuery; g.hasSearch = g.hasQuery; g.normalize = function () { return this._parts.urn ? this.normalizeProtocol(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build() : this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build() };
    g.normalizeProtocol = function (a) { "string" === typeof this._parts.protocol && (this._parts.protocol = this._parts.protocol.toLowerCase(), this.build(!a)); return this }; g.normalizeHostname = function (a) { this._parts.hostname && (this.is("IDN") && h ? this._parts.hostname = h.toASCII(this._parts.hostname) : this.is("IPv6") && l && (this._parts.hostname = l.best(this._parts.hostname)), this._parts.hostname = this._parts.hostname.toLowerCase(), this.build(!a)); return this }; g.normalizePort = function (a) {
    "string" === typeof this._parts.protocol &&
        this._parts.port === d.defaultPorts[this._parts.protocol] && (this._parts.port = null, this.build(!a)); return this
    }; g.normalizePath = function (a) {
        var b = this._parts.path; if (!b) return this; if (this._parts.urn) return this._parts.path = d.recodeUrnPath(this._parts.path), this.build(!a), this; if ("/" === this._parts.path) return this; b = d.recodePath(b); var c = ""; if ("/" !== b.charAt(0)) { var e = !0; b = "/" + b } if ("/.." === b.slice(-3) || "/." === b.slice(-2)) b += "/"; b = b.replace(/(\/(\.\/)+)|(\/\.$)/g, "/").replace(/\/{2,}/g, "/"); e && (c = b.substring(1).match(/^(\.\.\/)+/) ||
            "") && (c = c[0]); for (; ;) { var f = b.search(/\/\.\.(\/|$)/); if (-1 === f) break; else if (0 === f) { b = b.substring(3); continue } var g = b.substring(0, f).lastIndexOf("/"); -1 === g && (g = f); b = b.substring(0, g) + b.substring(f + 3) } e && this.is("relative") && (b = c + b.substring(1)); this._parts.path = b; this.build(!a); return this
    }; g.normalizePathname = g.normalizePath; g.normalizeQuery = function (a) {
    "string" === typeof this._parts.query && (this._parts.query.length ? this.query(d.parseQuery(this._parts.query, this._parts.escapeQuerySpace)) : this._parts.query =
        null, this.build(!a)); return this
    }; g.normalizeFragment = function (a) { this._parts.fragment || (this._parts.fragment = null, this.build(!a)); return this }; g.normalizeSearch = g.normalizeQuery; g.normalizeHash = g.normalizeFragment; g.iso8859 = function () { var a = d.encode, b = d.decode; d.encode = escape; d.decode = decodeURIComponent; try { this.normalize() } finally { d.encode = a, d.decode = b } return this }; g.unicode = function () { var a = d.encode, b = d.decode; d.encode = y; d.decode = unescape; try { this.normalize() } finally { d.encode = a, d.decode = b } return this };
    g.readable = function () {
        var a = this.clone(); a.username("").password("").normalize(); var b = ""; a._parts.protocol && (b += a._parts.protocol + "://"); a._parts.hostname && (a.is("punycode") && h ? (b += h.toUnicode(a._parts.hostname), a._parts.port && (b += ":" + a._parts.port)) : b += a.host()); a._parts.hostname && a._parts.path && "/" !== a._parts.path.charAt(0) && (b += "/"); b += a.path(!0); if (a._parts.query) {
            for (var c = "", e = 0, f = a._parts.query.split("&"), g = f.length; e < g; e++) {
                var k = (f[e] || "").split("="); c += "&" + d.decodeQuery(k[0], this._parts.escapeQuerySpace).replace(/&/g,
                    "%26"); void 0 !== k[1] && (c += "=" + d.decodeQuery(k[1], this._parts.escapeQuerySpace).replace(/&/g, "%26"))
            } b += "?" + c.substring(1)
        } return b += d.decodeQuery(a.hash(), !0)
    }; g.absoluteTo = function (a) {
        var b = this.clone(), c = ["protocol", "username", "password", "hostname", "port"], e, f; if (this._parts.urn) throw Error("URNs do not have any generally defined hierarchical components"); a instanceof d || (a = new d(a)); if (b._parts.protocol) return b; b._parts.protocol = a._parts.protocol; if (this._parts.hostname) return b; for (e = 0; f = c[e]; e++)b._parts[f] =
            a._parts[f]; b._parts.path ? (".." === b._parts.path.substring(-2) && (b._parts.path += "/"), "/" !== b.path().charAt(0) && (c = (c = a.directory()) ? c : 0 === a.path().indexOf("/") ? "/" : "", b._parts.path = (c ? c + "/" : "") + b._parts.path, b.normalizePath())) : (b._parts.path = a._parts.path, b._parts.query || (b._parts.query = a._parts.query)); b.build(); return b
    }; g.relativeTo = function (a) {
        var b = this.clone().normalize(); if (b._parts.urn) throw Error("URNs do not have any generally defined hierarchical components"); a = (new d(a)).normalize(); var c =
            b._parts; var e = a._parts; var f = b.path(); a = a.path(); if ("/" !== f.charAt(0)) throw Error("URI is already relative"); if ("/" !== a.charAt(0)) throw Error("Cannot calculate a URI relative to another relative URI"); c.protocol === e.protocol && (c.protocol = null); if (c.username === e.username && c.password === e.password && null === c.protocol && null === c.username && null === c.password && c.hostname === e.hostname && c.port === e.port) c.hostname = null, c.port = null; else return b.build(); if (f === a) return c.path = "", b.build(); f = d.commonPath(f, a);
        if (!f) return b.build(); e = e.path.substring(f.length).replace(/[^\/]*$/, "").replace(/.*?\//g, "../"); c.path = e + c.path.substring(f.length) || "./"; return b.build()
    }; g.equals = function (a) {
        var b = this.clone(), c = new d(a); a = {}; var e; b.normalize(); c.normalize(); if (b.toString() === c.toString()) return !0; var f = b.query(); var g = c.query(); b.query(""); c.query(""); if (b.toString() !== c.toString() || f.length !== g.length) return !1; b = d.parseQuery(f, this._parts.escapeQuerySpace); g = d.parseQuery(g, this._parts.escapeQuerySpace); for (e in b) if (r.call(b,
            e)) { if (!n(b[e])) { if (b[e] !== g[e]) return !1 } else if (!B(b[e], g[e])) return !1; a[e] = !0 } for (e in g) if (r.call(g, e) && !a[e]) return !1; return !0
    }; g.preventInvalidHostname = function (a) { this._parts.preventInvalidHostname = !!a; return this }; g.duplicateQueryParameters = function (a) { this._parts.duplicateQueryParameters = !!a; return this }; g.escapeQuerySpace = function (a) { this._parts.escapeQuerySpace = !!a; return this }; return d
});
(function (h, l) { "object" === typeof module && module.exports ? module.exports = l(require("./URI")) : "function" === typeof define && define.amd ? define(["./URI"], l) : l(h.URI) })(this, function (h) {
    var l = h.prototype, q = l.fragment; h.fragmentPrefix = "?"; var m = h._parts; h._parts = function () { var d = m(); d.fragmentPrefix = h.fragmentPrefix; return d }; l.fragmentPrefix = function (d) { this._parts.fragmentPrefix = d; return this }; l.fragment = function (d, k) {
        var l = this._parts.fragmentPrefix, n = this._parts.fragment || ""; return !0 === d ? n.substring(0,
            l.length) !== l ? {} : h.parseQuery(n.substring(l.length)) : void 0 !== d && "string" !== typeof d ? (this._parts.fragment = l + h.buildQuery(d), this.build(!k), this) : q.call(this, d, k)
    }; l.addFragment = function (d, k, l) { var n = this._parts.fragmentPrefix, m = h.parseQuery((this._parts.fragment || "").substring(n.length)); h.addQuery(m, d, k); this._parts.fragment = n + h.buildQuery(m); "string" !== typeof d && (l = k); this.build(!l); return this }; l.removeFragment = function (d, k, l) {
        var n = this._parts.fragmentPrefix, m = h.parseQuery((this._parts.fragment ||
            "").substring(n.length)); h.removeQuery(m, d, k); this._parts.fragment = n + h.buildQuery(m); "string" !== typeof d && (l = k); this.build(!l); return this
    }; l.setFragment = function (d, k, l) { var n = this._parts.fragmentPrefix, m = h.parseQuery((this._parts.fragment || "").substring(n.length)); h.setQuery(m, d, k); this._parts.fragment = n + h.buildQuery(m); "string" !== typeof d && (l = k); this.build(!l); return this }; l.addHash = l.addFragment; l.removeHash = l.removeFragment; l.setHash = l.setFragment; return h
});
