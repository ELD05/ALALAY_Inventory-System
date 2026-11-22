var currentUser = localStorage.getItem("alalay_user") || null;
(function () {
  var loggedIn = localStorage.getItem("alalay_loggedIn") === "true";

  if (!loggedIn) {
    window.location.href = "login.html";
    return;
  }

  // Set user greeting
  document.addEventListener("DOMContentLoaded", function () {
    var currentUser = localStorage.getItem("alalay_user") || "User";
    $("ht").textContent = "Magandang umaga, " + currentUser;
    render();
  });
})();
var P = [
  ["AirWave Pro Headphones", "PRD-001", "Audio", 249, 38],
  ["Vertex Smartphone X", "PRD-002", "Mobile", 799, 16],
  ["Studio Wireless Headset", "PRD-003", "Audio", 189, 8],
  ["Pocket Buds 2", "PRD-004", "Accessories", 129, 5],
  ["Ergo Mechanical Keyboard", "PRD-005", "Accessories", 159, 24],
  ["UltraView 27 Display", "PRD-006", "Displays", 429, 0],
];
var T = [
  [
    "TRX-1048",
    "Olivia Martin",
    "Jun 18, 2025",
    "AirWave Pro + 1 item",
    388,
    "Visa •••• 4242",
    "Completed",
  ],
  [
    "TRX-1047",
    "Jackson Lee",
    "Jun 18, 2025",
    "Vertex Smartphone X",
    799,
    "Bank transfer",
    "Completed",
  ],
  [
    "TRX-1046",
    "Sophia Patel",
    "Jun 17, 2025",
    "Pocket Buds 2",
    129,
    "Mastercard •••• 1881",
    "Pending",
  ],
  [
    "TRX-1045",
    "Noah Williams",
    "Jun 17, 2025",
    "UltraView Display",
    429,
    "Visa •••• 6620",
    "Completed",
  ],
  [
    "TRX-1044",
    "Emma Thompson",
    "Jun 16, 2025",
    "Studio Headset + 2 items",
    477,
    "Cash",
    "Refunded",
  ],
];
var S = [
  [
    "Nova Electronics",
    "SUP-001",
    "Marcus Chen",
    "marcus@novaelectronics.co",
    "+1 415 880 2401",
    "San Francisco, CA",
    "Audio, Accessories",
  ],
  [
    "Vertex Distribution",
    "SUP-002",
    "Lena Foster",
    "lena@vertexdist.com",
    "+1 212 440 1890",
    "New York, NY",
    "Mobile, Displays",
  ],
  [
    "Orbit Wholesale",
    "SUP-003",
    "Dylan Brooks",
    "dylan@orbitwholesale.com",
    "+1 312 920 0844",
    "Chicago, IL",
    "Computers, Storage",
  ],
  [
    "Peak Tech Supply",
    "SUP-004",
    "Amara Okafor",
    "amara@peakte.ch",
    "+1 206 330 5721",
    "Seattle, WA",
    "Networking, Audio",
  ],
  [
    "Coastal Components",
    "SUP-005",
    "Eric Davis",
    "eric@coastalcomponents.io",
    "+1 305 720 1338",
    "Miami, FL",
    "Accessories",
  ],
];
var M = [240, 320, 295, 430, 375, 540, 565, 500, 645, 610, 720, 780],
  MN = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
var V = {
  dashboard: ["Dashboard", "Here's what's happening with our system today."],
  products: ["Products", "Catalog and inventory"],
  sales: ["Sales & transactions", "Sales performance and payment history"],
  suppliers: ["Suppliers", "Vendor and supply management"],
};
var $ = function (i) {
  return document.getElementById(i);
};
function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&", "<": "<", ">": ">", '"': "" }[c];
  });
}
function status(q) {
  return q === 0
    ? ["out", "Out of stock"]
    : q < 10
      ? ["low", "Low stock"]
      : ["in", "In stock"];
}
function money(n) {
  return (
    "$" +
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
function chart() {
  var W = 700,
    H = 300,
    l = 44,
    b = 270,
    t = 20,
    x = function (i) {
      return l + (i * (W - l - 10)) / 11;
    },
    y = function (v) {
      return b - (v / 800) * (b - t);
    };
  var d = "M" + x(0) + "," + y(M[0]);
  for (var i = 1; i < M.length; i++) {
    var cx = (x(i - 1) + x(i)) / 2;
    d +=
      " C" +
      cx +
      "," +
      y(M[i - 1]) +
      " " +
      cx +
      "," +
      y(M[i]) +
      " " +
      x(i) +
      "," +
      y(M[i]);
  }
  var s =
    '<svg class="chart" viewBox="0 0 ' +
    W +
    " " +
    H +
    '" role="img" aria-label="Monthly revenue rising from 240k in January to 780k in December"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2563eb" stop-opacity=".38"/><stop offset="1" stop-color="#2563eb" stop-opacity=".02"/></linearGradient></defs>';
  [0, 200, 400, 600, 800].forEach(function (v) {
    s +=
      '<line x1="' +
      l +
      '" x2="' +
      (W - 10) +
      '" y1="' +
      y(v) +
      '" y2="' +
      y(v) +
      '" stroke="currentColor" stroke-opacity=".18" stroke-dasharray="4 4"/><text x="' +
      (l - 8) +
      '" y="' +
      (y(v) + 4) +
      '" text-anchor="end" font-size="12" fill="currentColor" opacity=".7">' +
      (v ? v + "k" : "0k") +
      "</text>";
  });
  s +=
    '<path d="' +
    d +
    " L" +
    x(11) +
    "," +
    b +
    " L" +
    x(0) +
    "," +
    b +
    'Z" fill="url(#g)"/><path d="' +
    d +
    '" fill="none" stroke="#2563eb" stroke-width="3"/>';
  MN.forEach(function (m, i) {
    s +=
      '<text x="' +
      x(i) +
      '" y="292" text-anchor="middle" font-size="12" fill="currentColor" opacity=".7">' +
      m +
      "</text>";
  });
  return s + "</svg>";
}
function dash() {
  var low = P.filter(function (p) {
    return p[4] < 10;
  });
  return (
    '<div class="stats"><div class="stat"><span>Total products</span><b>1,248</b></div><div class="stat"><span>Total sales</span><b>$286,421</b></div><div class="stat"><span>Low stock items</span><b>18</b></div><div class="stat"><span>Total suppliers</span><b>64</b></div></div>' +
    '<div class="two"><div class="panel"><div class="ch"><div><h3>Sales overview</h3><small>Monthly revenue performance</small></div><select aria-label="Period"><option>This year</option><option>Last year</option></select></div><div class="big">$762.4k <span class="delta">↑ 42.2%</span></div>' +
    chart() +
    "</div>" +
    '<div class="panel low"><h3>Low stock</h3><p>Items requiring attention</p><ul>' +
    P.filter(function (p) {
      return p[4] < 10 || p[4] === 0;
    })
      .map(function (p) {
        return "<li>" + esc(p[0]) + "</li>";
      })
      .join("") +
    '</ul><a class="btn" href="#products" style="display:block;text-align:center;text-decoration:none">View inventory</a></div></div>'
  );
}
var pq = "",
  pc = "All categories",
  pp = 1,
  PER = 5;
function prodRows() {
  var q = pq.toLowerCase(),
    L = P.filter(function (p) {
      return (
        (pc === "All categories" || p[2] === pc) &&
        (!q ||
          p[0].toLowerCase().indexOf(q) > -1 ||
          p[1].toLowerCase().indexOf(q) > -1)
      );
    });
  var pages = Math.max(1, Math.ceil(L.length / PER));
  if (pp > pages) pp = pages;
  var sl = L.slice((pp - 1) * PER, pp * PER);
  $("pb").innerHTML = sl.length
    ? sl
        .map(function (p) {
          var s = status(p[4]),
            i = P.indexOf(p);
          return (
            '<tr><td class="pn">' +
            esc(p[0]) +
            "</td><td>" +
            p[1] +
            '</td><td class="m">' +
            p[2] +
            "</td><td><b>" +
            money(p[3]) +
            '</b></td><td class="m r">' +
            p[4] +
            '</td><td class="st ' +
            s[0] +
            '">' +
            s[1] +
            '</td><td style="white-space:nowrap"><button class="ic" data-e="' +
            i +
            '" aria-label="Edit ' +
            esc(p[0]) +
            '">✎</button><button class="ic" data-d="' +
            i +
            '" aria-label="Delete ' +
            esc(p[0]) +
            '">🗑</button></td></tr>'
          );
        })
        .join("")
    : '<tr><td colspan="7" class="empty">No products match. Clear the search or choose another category.</td></tr>';
  $("pi").textContent = L.length
    ? "Showing " +
      ((pp - 1) * PER + 1) +
      "–" +
      ((pp - 1) * PER + sl.length) +
      " of " +
      L.length
    : "Showing 0 of 0";
  $("pv").disabled = pp <= 1;
  $("nx").disabled = pp >= pages;
}
function prods() {
  var cats = ["All categories"].concat(
    P.map(function (p) {
      return p[2];
    }).filter(function (v, i, a) {
      return a.indexOf(v) === i;
    }),
  );
  return (
    '<div class="top"><div><h2>Product management</h2><p class="sub">Manage your catalog, pricing, and inventory levels.</p></div><button class="btn" id="ap">+ &nbsp; Add product</button></div>' +
    '<div class="filters"><input id="q" type="search" placeholder="Search by product name or ID..." aria-label="Search products"><select id="c" aria-label="Category">' +
    cats
      .map(function (c) {
        return "<option>" + c + "</option>";
      })
      .join("") +
    "</select></div>" +
    '<div class="tw"><table><thead><tr><th>PRODUCT</th><th>PRODUCT ID</th><th>CATEGORY</th><th>PRICE</th><th class="r">QUANTITY</th><th>STATUS</th><th></th></tr></thead><tbody id="pb"></tbody></table><div class="pager"><span id="pi"></span><span><button id="pv">‹ Prev</button><button id="nx">Next ›</button></span></div></div>'
  );
}
var tq = "",
  ts = "All statuses";
function saleRows() {
  var q = tq.toLowerCase(),
    L = T.filter(function (t) {
      return (
        (ts === "All statuses" || t[6] === ts) &&
        (!q ||
          t[0].toLowerCase().indexOf(q) > -1 ||
          t[1].toLowerCase().indexOf(q) > -1)
      );
    });
  $("tb").innerHTML = L.length
    ? L.map(function (t) {
        var ini = t[1]
            .split(" ")
            .map(function (w) {
              return w[0];
            })
            .join(""),
          c = t[6] === "Completed" ? "c" : t[6] === "Pending" ? "p" : "x";
        return (
          "<tr><td><b>" +
          t[0] +
          '</b></td><td><div class="cu"><i>' +
          ini +
          "</i>" +
          esc(t[1]) +
          '</div></td><td><span class="chip">' +
          t[2] +
          '</span></td><td class="m">' +
          esc(t[3]) +
          '</td><td class="r"><b>' +
          money(t[4]) +
          '</b></td><td class="m">' +
          esc(t[5]) +
          '</td><td class="tag ' +
          c +
          '">' +
          t[6] +
          '</td><td><button class="ic" data-v2="' +
          t[0] +
          '" aria-label="View ' +
          t[0] +
          '">👁</button></td></tr>'
        );
      }).join("")
    : '<tr><td colspan="8" class="empty">No transactions match those filters.</td></tr>';
}
function sales() {
  return (
    '<div class="top"><div><h2>Sales & transactions</h2><p class="sub">Track payments, review orders, and monitor sales performance.</p></div><button class="btn g" id="ex">Export</button></div>' +
    '<div class="sum"><div class="stat"><span>Total sales</span><b>$286,421.80</b></div><div class="stat"><span>Total transactions</span><b>3,842</b></div></div>' +
    '<div class="filters"><input id="tq" type="search" placeholder="Search customer or transaction ID..." aria-label="Search transactions"><input id="td" type="date" aria-label="Date" style="flex:1 1 150px"><select id="ts" aria-label="Status"><option>All statuses</option><option>Completed</option><option>Pending</option><option>Refunded</option></select></div>' +
    '<div class="tw sales"><table><thead><tr><th>Transaction</th><th>Customer</th><th>Date</th><th>Products</th><th class="r">Amount</th><th>Payment</th><th>Status</th><th>Action</th></tr></thead><tbody id="tb"></tbody></table></div>'
  );
}
var sq = "";
function supRows() {
  var q = sq.toLowerCase(),
    L = S.filter(function (s) {
      return !q || s.join(" ").toLowerCase().indexOf(q) > -1;
    });
  $("sb").innerHTML = L.length
    ? L.map(function (s) {
        var i = S.indexOf(s);
        return (
          '<tr><td class="nm"><b>' +
          esc(s[0]) +
          "</b><span>" +
          s[1] +
          '</span></td><td class="pe">' +
          esc(s[2]) +
          '</td><td class="ct">' +
          esc(s[3]) +
          "<br>" +
          s[4] +
          '</td><td class="ad">' +
          s[5] +
          '</td><td class="pr">' +
          s[6] +
          '</td><td style="white-space:nowrap"><button class="ic" data-se="' +
          i +
          '" aria-label="Edit ' +
          esc(s[0]) +
          '">✎</button><button class="ic" data-sd="' +
          i +
          '" aria-label="Delete ' +
          esc(s[0]) +
          '">🗑</button></td></tr>'
        );
      }).join("")
    : '<tr><td colspan="6" class="empty">No suppliers match your search.</td></tr>';
}
function sups() {
  return (
    '<div class="top"><div><h2>Supplier management</h2><p class="sub">Organize vendor details and supplier relationships.</p></div><button class="btn" id="as">+ &nbsp; Add supplier</button></div>' +
    '<div class="filters"><input id="sq" type="search" placeholder="Search suppliers, contacts, or products..." aria-label="Search suppliers"></div>' +
    '<div class="tw sup"><table><thead><tr><th>Supplier</th><th>Contact person</th><th>Contact details</th><th>Address</th><th>Supplied products</th><th>Actions</th></tr></thead><tbody id="sb"></tbody></table></div>'
  );
}
function form(title, fields, vals, cb) {
  $("dt").textContent = title;
  $("df").innerHTML = fields
    .map(function (f, i) {
      return (
        '<label for="f' +
        i +
        '">' +
        f +
        '</label><input id="f' +
        i +
        '" value="' +
        esc(vals[i] || "") +
        '">'
      );
    })
    .join("");
  $("ds").onclick = function () {
    var o = fields.map(function (f, i) {
      return $("f" + i).value.trim();
    });
    if (!o[0]) return;
    cb(o);
    $("dlg").close();
    render();
  };
  $("dlg").showModal();
}
function render() {
  var v = (location.hash || "#dashboard").slice(1);
  if (!V[v]) v = "dashboard";
  document.querySelectorAll("nav a").forEach(function (a) {
    a.classList.toggle("on", a.dataset.v === v);
  });
  $("ht").textContent = "Magandang umaga, " + (currentUser || "User");
  $("hs").textContent = V[v][1];
  document.title = "ALALAY – " + V[v][0];
  $("pg").innerHTML = {
    dashboard: dash,
    products: prods,
    sales: sales,
    suppliers: sups,
  }[v]();
  if (v === "dashboard") {
    // Show dashboard-specific content
    document.querySelectorAll("nav a").forEach(function (a) {
      a.classList.toggle("on", a.dataset.v === v);
    });
    $("ht").textContent = "Magandang umaga, " + (currentUser || "User");
    $("hs").textContent = "Here's what's happening with our system today.";
    document.title = "ALALAY – Dashboard";
  }
  if (v === "products") {
    prodRows();
    $("q").value = pq;
    $("c").value = pc;
    $("q").oninput = function (e) {
      pq = e.target.value;
      pp = 1;
      prodRows();
    };
    $("c").onchange = function (e) {
      pc = e.target.value;
      pp = 1;
      prodRows();
    };
    $("pv").onclick = function () {
      pp--;
      prodRows();
    };
    $("nx").onclick = function () {
      pp++;
      prodRows();
    };
    $("ap").onclick = function () {
      form(
        "Add product",
        ["Product name", "Category", "Price (USD)", "Quantity"],
        [],
        function (o) {
          P.push([
            o[0],
            "PRD-" + String(P.length + 1).padStart(3, "0"),
            o[1] || "Accessories",
            parseFloat(o[2]) || 0,
            parseInt(o[3], 10) || 0,
          ]);
        },
      );
    };
    $("pb").onclick = function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.d !== undefined) {
        if (confirm("Delete this product?")) {
          P.splice(+b.dataset.d, 1);
          prodRows();
        }
      } else if (b.dataset.e !== undefined) {
        var p = P[+b.dataset.e];
        form(
          "Edit product",
          ["Product name", "Category", "Price (USD)", "Quantity"],
          [p[0], p[2], p[3], p[4]],
          function (o) {
            p[0] = o[0];
            p[2] = o[1] || p[2];
            p[3] = parseFloat(o[2]) || 0;
            p[4] = parseInt(o[3], 10) || 0;
          },
        );
      }
    };
  }
  if (v === "sales") {
    saleRows();
    $("tq").oninput = function (e) {
      tq = e.target.value;
      saleRows();
    };
    $("ts").onchange = function (e) {
      ts = e.target.value;
      saleRows();
    };
    $("ex").onclick = function () {
      var csv =
        "Transaction,Customer,Date,Products,Amount,Payment,Status\n" +
        T.map(function (t) {
          return t
            .map(function (c) {
              return '"' + c + '"';
            })
            .join(",");
        }).join("\n");
      alert("Export preview:\n\n" + csv);
    };
    $("tb").onclick = function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      var t = T.filter(function (x) {
        return x[0] === b.dataset.v2;
      })[0];
      alert(
        t[0] +
          "\n" +
          t[1] +
          " · " +
          t[2] +
          "\n" +
          t[3] +
          "\n" +
          money(t[4]) +
          " · " +
          t[5] +
          "\nStatus: " +
          t[6],
      );
    };
  }
  if (v === "suppliers") {
    supRows();
    $("sq").oninput = function (e) {
      sq = e.target.value;
      supRows();
    };
    var f = [
      "Supplier name",
      "Contact person",
      "Email",
      "Phone",
      "Address",
      "Supplied products",
    ];
    $("as").onclick = function () {
      form("Add supplier", f, [], function (o) {
        S.push([
          o[0],
          "SUP-" + String(S.length + 1).padStart(3, "0"),
          o[1],
          o[2],
          o[3],
          o[4],
          o[5],
        ]);
      });
    };
    $("sb").onclick = function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.sd !== undefined) {
        if (confirm("Delete this supplier?")) {
          S.splice(+b.dataset.sd, 1);
          supRows();
        }
      } else if (b.dataset.se !== undefined) {
        var s = S[+b.dataset.se];
        form(
          "Edit supplier",
          f,
          [s[0], s[2], s[3], s[4], s[5], s[6]],
          function (o) {
            s[0] = o[0];
            s[2] = o[1];
            s[3] = o[2];
            s[4] = o[3];
            s[5] = o[4];
            s[6] = o[5];
          },
        );
      }
    };
  }
  window.scrollTo(0, 0);
}
$("dc").onclick = function () {
  $("dlg").close();
};
$("gs").onclick = function () {
  var v = (location.hash || "#dashboard").slice(1);
  var el = document.querySelector("#q,#tq,#sq");
  if (el) el.focus();
  else location.hash = "#products";
};
window.addEventListener("hashchange", render);
render();
