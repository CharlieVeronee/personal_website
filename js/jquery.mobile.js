!(function (e, t, n) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (o) {
        return n(o, e, t), o.mobile;
      })
    : n(e.jQuery, e, t);
})(this, document, function (e, t, n, o) {
  var i, s;
  !(function (e, t, n, o) {
    var i,
      s,
      a = "virtualMouseBindings",
      r = "virtualTouchID",
      c =
        "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(
          " "
        ),
      u = "clientX clientY pageX pageY screenX screenY".split(" "),
      l = e.event.mouseHooks ? e.event.mouseHooks.props : [],
      p = e.event.props.concat(l),
      h = {},
      v = 0,
      d = 0,
      f = 0,
      m = !1,
      g = [],
      w = !1,
      b = !1,
      T = "addEventListener" in n,
      D = e(n),
      y = 1,
      E = 0;
    function P(e) {
      for (; e && void 0 !== e.originalEvent; ) e = e.originalEvent;
      return e;
    }
    function X(t) {
      for (var n, o, i = {}; t; ) {
        n = e.data(t, a);
        for (o in n) n[o] && (i[o] = i.hasVirtualBinding = !0);
        t = t.parentNode;
      }
      return i;
    }
    function Y() {
      b = !0;
    }
    function k() {
      b = !1;
    }
    function M() {
      I(),
        (v = setTimeout(function () {
          (v = 0), (E = 0), (g.length = 0), (w = !1), Y();
        }, e.vmouse.resetTimerDuration));
    }
    function I() {
      v && (clearTimeout(v), (v = 0));
    }
    function x(t, n, i) {
      var s;
      return (
        ((i && i[t]) ||
          (!i &&
            (function (t, n) {
              for (var o; t; ) {
                if ((o = e.data(t, a)) && (!n || o[n])) return t;
                t = t.parentNode;
              }
              return null;
            })(n.target, t))) &&
          ((s = (function (t, n) {
            var i,
              s,
              a,
              r,
              c,
              l,
              h,
              v,
              d,
              f = t.type;
            if (
              (((t = e.Event(t)).type = n),
              (i = t.originalEvent),
              (s = e.event.props),
              f.search(/^(mouse|click)/) > -1 && (s = p),
              i)
            )
              for (h = s.length; h; ) t[(r = s[--h])] = i[r];
            if (
              (f.search(/mouse(down|up)|click/) > -1 &&
                !t.which &&
                (t.which = 1),
              -1 !== f.search(/^touch/) &&
                ((f = (a = P(i)).touches),
                (c = a.changedTouches),
                (l = f && f.length ? f[0] : c && c.length ? c[0] : o)))
            )
              for (v = 0, d = u.length; v < d; v++) t[(r = u[v])] = l[r];
            return t;
          })(n, t)),
          e(n.target).trigger(s)),
        s
      );
    }
    function S(t) {
      var n,
        o = e.data(t.target, r);
      w ||
        (E && E === o) ||
        ((n = x("v" + t.type, t)) &&
          (n.isDefaultPrevented() && t.preventDefault(),
          n.isPropagationStopped() && t.stopPropagation(),
          n.isImmediatePropagationStopped() && t.stopImmediatePropagation()));
    }
    function L(t) {
      var n,
        o,
        i,
        s = P(t).touches;
      s &&
        1 === s.length &&
        (o = X((n = t.target))).hasVirtualBinding &&
        ((E = y++),
        e.data(n, r, E),
        I(),
        k(),
        (m = !1),
        (i = P(t).touches[0]),
        (d = i.pageX),
        (f = i.pageY),
        x("vmouseover", t, o),
        x("vmousedown", t, o));
    }
    function O(e) {
      b || (m || x("vmousecancel", e, X(e.target)), (m = !0), M());
    }
    function B(t) {
      if (!b) {
        var n = P(t).touches[0],
          o = m,
          i = e.vmouse.moveDistanceThreshold,
          s = X(t.target);
        (m = m || Math.abs(n.pageX - d) > i || Math.abs(n.pageY - f) > i) &&
          !o &&
          x("vmousecancel", t, s),
          x("vmousemove", t, s),
          M();
      }
    }
    function N(e) {
      if (!b) {
        Y();
        var t,
          n,
          o = X(e.target);
        x("vmouseup", e, o),
          m ||
            ((t = x("vclick", e, o)) &&
              t.isDefaultPrevented() &&
              ((n = P(e).changedTouches[0]),
              g.push({
                touchID: E,
                x: n.clientX,
                y: n.clientY,
              }),
              (w = !0))),
          x("vmouseout", e, o),
          (m = !1),
          M();
      }
    }
    function j(t) {
      var n,
        o = e.data(t, a);
      if (o) for (n in o) if (o[n]) return !0;
      return !1;
    }
    function z() {}
    function F(t) {
      var n = t.substr(1);
      return {
        setup: function () {
          j(this) || e.data(this, a, {}),
            (e.data(this, a)[t] = !0),
            (h[t] = (h[t] || 0) + 1),
            1 === h[t] && D.bind(n, S),
            e(this).bind(n, z),
            T &&
              ((h.touchstart = (h.touchstart || 0) + 1),
              1 === h.touchstart &&
                D.bind("touchstart", L)
                  .bind("touchend", N)
                  .bind("touchmove", B)
                  .bind("scroll", O));
        },
        teardown: function () {
          --h[t],
            h[t] || D.unbind(n, S),
            T &&
              (--h.touchstart,
              h.touchstart ||
                D.unbind("touchstart", L)
                  .unbind("touchmove", B)
                  .unbind("touchend", N)
                  .unbind("scroll", O));
          var o = e(this),
            i = e.data(this, a);
          i && (i[t] = !1), o.unbind(n, z), j(this) || o.removeData(a);
        },
      };
    }
    for (
      e.vmouse = {
        moveDistanceThreshold: 10,
        clickDistanceThreshold: 10,
        resetTimerDuration: 1500,
      },
        s = 0;
      s < c.length;
      s++
    )
      e.event.special[c[s]] = F(c[s]);
    T &&
      n.addEventListener(
        "click",
        function (t) {
          var n,
            o,
            s,
            a,
            c,
            u = g.length,
            l = t.target;
          if (u)
            for (
              n = t.clientX,
                o = t.clientY,
                i = e.vmouse.clickDistanceThreshold,
                s = l;
              s;

            ) {
              for (a = 0; a < u; a++)
                if (
                  ((c = g[a]),
                  0,
                  (s === l && Math.abs(c.x - n) < i && Math.abs(c.y - o) < i) ||
                    e.data(s, r) === c.touchID)
                )
                  return t.preventDefault(), void t.stopPropagation();
              s = s.parentNode;
            }
        },
        !0
      );
  })(e, 0, n),
    (e.mobile = {}),
    (s = {
      touch: "ontouchend" in n,
    }),
    ((i = e).mobile.support = i.mobile.support || {}),
    i.extend(i.support, s),
    i.extend(i.mobile.support, s),
    (function (e, t, o) {
      var i = e(n),
        s = e.mobile.support.touch,
        a = "touchmove scroll",
        r = s ? "touchstart" : "mousedown",
        c = s ? "touchend" : "mouseup",
        u = s ? "touchmove" : "mousemove";
      function l(t, n, i, s) {
        var a = i.type;
        (i.type = n),
          s ? e.event.trigger(i, o, t) : e.event.dispatch.call(t, i),
          (i.type = a);
      }
      e.each(
        "touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(
          " "
        ),
        function (t, n) {
          (e.fn[n] = function (e) {
            return e ? this.bind(n, e) : this.trigger(n);
          }),
            e.attrFn && (e.attrFn[n] = !0);
        }
      ),
        (e.event.special.scrollstart = {
          enabled: !0,
          setup: function () {
            var t,
              n,
              o = this;
            function i(e, n) {
              l(o, (t = n) ? "scrollstart" : "scrollstop", e);
            }
            e(o).bind(a, function (o) {
              e.event.special.scrollstart.enabled &&
                (t || i(o, !0),
                clearTimeout(n),
                (n = setTimeout(function () {
                  i(o, !1);
                }, 50)));
            });
          },
          teardown: function () {
            e(this).unbind(a);
          },
        }),
        (e.event.special.tap = {
          tapholdThreshold: 750,
          emitTapOnTaphold: !0,
          setup: function () {
            var t = this,
              n = e(t),
              o = !1;
            n.bind("vmousedown", function (s) {
              if (((o = !1), s.which && 1 !== s.which)) return !1;
              var a,
                r = s.target;
              function c() {
                clearTimeout(a);
              }
              function u() {
                c(),
                  n.unbind("vclick", p).unbind("vmouseup", c),
                  i.unbind("vmousecancel", u);
              }
              function p(e) {
                u(),
                  o || r !== e.target
                    ? o && e.preventDefault()
                    : l(t, "tap", e);
              }
              n.bind("vmouseup", c).bind("vclick", p),
                i.bind("vmousecancel", u),
                (a = setTimeout(function () {
                  e.event.special.tap.emitTapOnTaphold || (o = !0),
                    l(
                      t,
                      "taphold",
                      e.Event("taphold", {
                        target: r,
                      })
                    );
                }, e.event.special.tap.tapholdThreshold));
            });
          },
          teardown: function () {
            e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),
              i.unbind("vmousecancel");
          },
        }),
        (e.event.special.swipe = {
          scrollSupressionThreshold: 30,
          durationThreshold: 1e3,
          horizontalDistanceThreshold: 30,
          verticalDistanceThreshold: 30,
          getLocation: function (e) {
            var n = t.pageXOffset,
              o = t.pageYOffset,
              i = e.clientX,
              s = e.clientY;
            return (
              (0 === e.pageY && Math.floor(s) > Math.floor(e.pageY)) ||
              (0 === e.pageX && Math.floor(i) > Math.floor(e.pageX))
                ? ((i -= n), (s -= o))
                : (s < e.pageY - o || i < e.pageX - n) &&
                  ((i = e.pageX - n), (s = e.pageY - o)),
              {
                x: i,
                y: s,
              }
            );
          },
          start: function (t) {
            var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t,
              o = e.event.special.swipe.getLocation(n);
            return {
              time: new Date().getTime(),
              coords: [o.x, o.y],
              origin: e(t.target),
            };
          },
          stop: function (t) {
            var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t,
              o = e.event.special.swipe.getLocation(n);
            return {
              time: new Date().getTime(),
              coords: [o.x, o.y],
            };
          },
          handleSwipe: function (t, n, o, i) {
            if (
              n.time - t.time < e.event.special.swipe.durationThreshold &&
              Math.abs(t.coords[0] - n.coords[0]) >
                e.event.special.swipe.horizontalDistanceThreshold &&
              Math.abs(t.coords[1] - n.coords[1]) <
                e.event.special.swipe.verticalDistanceThreshold
            ) {
              var s = t.coords[0] > n.coords[0] ? "swipeleft" : "swiperight";
              return (
                l(
                  o,
                  "swipe",
                  e.Event("swipe", {
                    target: i,
                    swipestart: t,
                    swipestop: n,
                  }),
                  !0
                ),
                l(
                  o,
                  s,
                  e.Event(s, {
                    target: i,
                    swipestart: t,
                    swipestop: n,
                  }),
                  !0
                ),
                !0
              );
            }
            return !1;
          },
          eventInProgress: !1,
          setup: function () {
            var t,
              n = this,
              o = e(n),
              s = {};
            (t = e.data(this, "mobile-events")) ||
              ((t = {
                length: 0,
              }),
              e.data(this, "mobile-events", t)),
              t.length++,
              (t.swipe = s),
              (s.start = function (t) {
                if (!e.event.special.swipe.eventInProgress) {
                  e.event.special.swipe.eventInProgress = !0;
                  var o,
                    a = e.event.special.swipe.start(t),
                    r = t.target,
                    l = !1;
                  (s.move = function (t) {
                    a &&
                      !t.isDefaultPrevented() &&
                      ((o = e.event.special.swipe.stop(t)),
                      l ||
                        ((l = e.event.special.swipe.handleSwipe(a, o, n, r)) &&
                          (e.event.special.swipe.eventInProgress = !1)),
                      Math.abs(a.coords[0] - o.coords[0]) >
                        e.event.special.swipe.scrollSupressionThreshold &&
                        t.preventDefault());
                  }),
                    (s.stop = function () {
                      (l = !0),
                        (e.event.special.swipe.eventInProgress = !1),
                        i.off(u, s.move),
                        (s.move = null);
                    }),
                    i.on(u, s.move).one(c, s.stop);
                }
              }),
              o.on(r, s.start);
          },
          teardown: function () {
            var t, n;
            (t = e.data(this, "mobile-events")) &&
              ((n = t.swipe),
              delete t.swipe,
              t.length--,
              0 === t.length && e.removeData(this, "mobile-events")),
              n &&
                (n.start && e(this).off(r, n.start),
                n.move && i.off(u, n.move),
                n.stop && i.off(c, n.stop));
          },
        }),
        e.each(
          {
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe.left",
            swiperight: "swipe.right",
          },
          function (t, n) {
            e.event.special[t] = {
              setup: function () {
                e(this).bind(n, e.noop);
              },
              teardown: function () {
                e(this).unbind(n);
              },
            };
          }
        );
    })(e, this);
});
