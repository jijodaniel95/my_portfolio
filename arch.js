// Interactive architecture diagram: OpenShift (before) vs Google Cloud (after).
(function () {
  const svg = document.getElementById("arch-svg");
  if (!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.matchMedia("(max-width: 700px)");

  const kicker = document.getElementById("arch-kicker");
  const titleEl = document.getElementById("arch-title");
  const descEl = document.getElementById("arch-desc");
  const resultsEl = document.getElementById("arch-results");
  const tabs = [...document.querySelectorAll(".arch-tabs [role=tab]")];

  /* ---------- Content ---------- */
  const views = {
    before: {
      kicker: "Before · OpenShift",
      title: "Java services on OpenShift",
      desc: "Java services and EJB applications ran on an OpenShift cluster, with legacy APIs in front and services calling each other directly.",
      results: ["Higher infrastructure cost", "Point-to-point service calls", "Legacy EJB and SOAP integrations"],
      cluster: "OpenShift cluster",
      nodes: {
        client: ["Client apps", "web and mobile", "Applications and partner systems calling the platform."],
        edge: ["OpenShift router", "ingress", "Routed incoming traffic into the cluster."],
        proxy: ["Legacy APIs", "Fusion and SOAP", "Older Fusion and SOAP APIs that more than 15 key applications depended on."],
        s1: ["EJB app", "on WebLogic", "Monolithic Java EE applications hosted on WebLogic."],
        s2: ["Java service", "on TomEE", "Services built, packaged and deployed to Apache TomEE with shell scripts."],
        s3: ["Java service", "on TomEE", "Services built, packaged and deployed to Apache TomEE with shell scripts."],
        bus: ["Direct calls", "synchronous", "Services called each other directly, so one slow service could hold up others."],
        db: ["Oracle", "relational data", "Relational data accessed through SQL queries and stored procedures."],
      },
    },
    after: {
      kicker: "After · Google Cloud",
      title: "Containerized on GKE",
      desc: "More than 100 microservices moved to Google Kubernetes Engine, with NGINX routing and Go proxies in front and Pub/Sub for asynchronous events.",
      results: ["100+ services migrated", "About 40% lower infrastructure cost", "High availability on GKE"],
      cluster: "GKE cluster · Google Cloud",
      nodes: {
        client: ["Client apps", "web and mobile", "The same applications and partner systems, now served from Google Cloud with no change on their side."],
        edge: ["NGINX routing", "load balancing", "NGINX-based routing that spread traffic better and held latency down at peak load."],
        proxy: ["Go proxies", "cut-over layer", "Go proxies built for the GCP transformation, so traffic kept flowing while services moved."],
        s1: ["Spring Boot", "microservice", "Services rebuilt with Spring Boot, containerized with Docker and run on GKE. EJB apps were containerized on TomEE."],
        s2: ["Spring Boot", "microservice", "More than 50 RESTful microservices in Spring Boot and Go, secured with JWT."],
        s3: ["Spring Boot", "microservice", "Each service scales on its own inside GKE for high availability."],
        bus: ["Google Pub/Sub", "event-driven", "Asynchronous events between services, so they no longer wait on each other."],
        db: ["SQL databases", "Hibernate and JPA", "Persistence through Hibernate and JPA, with tuned SQL for data access."],
      },
    },
  };

  /* ---------- Layouts ---------- */
  const layouts = {
    wide: {
      vb: [0, 0, 1000, 450],
      cluster: [600, 24, 380, 296],
      nodes: {
        client: [20, 160, 140, 76],
        edge: [215, 160, 150, 76],
        proxy: [420, 160, 150, 76],
        s1: [628, 64, 160, 60],
        s2: [628, 142, 160, 60],
        s3: [628, 220, 160, 60],
        bus: [820, 142, 140, 60],
        db: [660, 360, 220, 64],
      },
    },
    tall: {
      vb: [0, 0, 400, 760],
      cluster: [14, 326, 372, 254],
      nodes: {
        client: [110, 16, 180, 64],
        edge: [110, 120, 180, 64],
        proxy: [110, 224, 180, 64],
        s1: [30, 372, 104, 64],
        s2: [148, 372, 104, 64],
        s3: [266, 372, 104, 64],
        bus: [60, 488, 280, 60],
        db: [100, 650, 200, 64],
      },
    },
  };

  const edges = [
    ["client", "edge"], ["edge", "proxy"],
    ["proxy", "s1"], ["proxy", "s2"], ["proxy", "s3"],
    ["s1", "bus"], ["s2", "bus"], ["s3", "bus"],
    ["bus", "db"],
  ];

  let view = "after";
  let active = null;

  /* ---------- Helpers ---------- */
  const el = (name, attrs = {}, parent = svg, text) => {
    const n = document.createElementNS(NS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    parent.appendChild(n);
    return n;
  };

  function anchors(a, b) {
    const [ax, ay, aw, ah] = a, [bx, by, bw, bh] = b;
    const acx = ax + aw / 2, acy = ay + ah / 2, bcx = bx + bw / 2, bcy = by + bh / 2;
    const dx = bcx - acx, dy = bcy - acy;
    if (Math.abs(dx) > Math.abs(dy)) {
      const sx = dx > 0 ? ax + aw : ax, ex = dx > 0 ? bx : bx + bw;
      const m = (ex - sx) / 2;
      return `M${sx},${acy} C${sx + m},${acy} ${ex - m},${bcy} ${ex},${bcy}`;
    }
    const sy = dy > 0 ? ay + ah : ay, ey = dy > 0 ? by : by + bh;
    const m = (ey - sy) / 2;
    return `M${acx},${sy} C${acx},${sy + m} ${bcx},${ey - m} ${bcx},${ey}`;
  }

  /* ---------- Render ---------- */
  function render() {
    const L = narrow.matches ? layouts.tall : layouts.wide;
    const V = views[view];
    svg.innerHTML = "";
    svg.setAttribute("viewBox", L.vb.join(" "));
    svg.dataset.view = view;

    // Cluster frame
    const [cx, cy, cw, ch] = L.cluster;
    el("rect", { class: "a-cluster", x: cx, y: cy, width: cw, height: ch, rx: 18 });
    el("text", { class: "a-cluster-label", x: cx + 18, y: cy + 26 }, svg, V.cluster);

    // Edges
    const edgeLayer = el("g", { class: "a-edges" });
    const edgeEls = edges.map(([a, b], i) => {
      const d = anchors(L.nodes[a], L.nodes[b]);
      const p = el("path", { class: "a-edge", d, id: `ae-${i}` }, edgeLayer);
      p.dataset.from = a; p.dataset.to = b;
      return p;
    });

    // Packets
    if (!reduce) {
      const pk = el("g", { class: "a-packets" });
      edgeEls.forEach((p, i) => {
        const slow = view === "before";
        const dur = (slow ? 3.4 : 1.7) + (i % 3) * 0.3;
        const c = el("circle", { class: "a-packet", r: narrow.matches ? 4 : 4.5, opacity: 0 }, pk);
        const begin = `${(i * 0.18).toFixed(2)}s`;
        const show = document.createElementNS(NS, "set");
        show.setAttribute("attributeName", "opacity");
        show.setAttribute("to", "1");
        show.setAttribute("begin", begin);
        c.appendChild(show);
        const m = document.createElementNS(NS, "animateMotion");
        m.setAttribute("dur", `${dur}s`);
        m.setAttribute("begin", begin);
        m.setAttribute("repeatCount", "indefinite");
        const mp = document.createElementNS(NS, "mpath");
        mp.setAttribute("href", `#ae-${i}`);
        m.appendChild(mp);
        c.appendChild(m);
      });
    }

    // Nodes
    Object.entries(L.nodes).forEach(([id, [x, y, w, h]]) => {
      const [t, sub] = V.nodes[id];
      const g = el("g", {
        class: `a-node n-${id}${active === id ? " active" : ""}`,
        tabindex: 0, role: "button", "aria-label": `${t}, ${sub}`,
      });
      g.dataset.id = id;
      el("rect", { x, y, width: w, height: h, rx: 12 }, g);
      el("text", { class: "a-title", x: x + w / 2, y: y + h / 2 - 3, "text-anchor": "middle" }, g, t);
      el("text", { class: "a-sub", x: x + w / 2, y: y + h / 2 + 15, "text-anchor": "middle" }, g, sub);
      g.addEventListener("click", () => select(id));
      g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(id); }
      });
      g.addEventListener("pointerenter", () => highlight(id));
      g.addEventListener("pointerleave", () => highlight(active));
    });

    highlight(active);
    renderPanel();
  }

  function highlight(id) {
    svg.querySelectorAll(".a-edge").forEach((p) => {
      p.classList.toggle("hot", !!id && (p.dataset.from === id || p.dataset.to === id));
    });
    svg.classList.toggle("focusing", !!id);
  }

  function select(id) {
    active = active === id ? null : id;
    svg.querySelectorAll(".a-node").forEach((g) => g.classList.toggle("active", g.dataset.id === active));
    highlight(active);
    renderPanel();
  }

  function renderPanel() {
    const V = views[view];
    kicker.textContent = V.kicker;
    if (active) {
      const [t, sub, desc] = V.nodes[active];
      titleEl.textContent = t;
      descEl.textContent = desc;
      resultsEl.innerHTML = `<li class="a-sub-chip">${sub}</li>`;
    } else {
      titleEl.textContent = V.title;
      descEl.textContent = V.desc;
      resultsEl.innerHTML = V.results.map((r) => `<li>${r}</li>`).join("");
    }
  }

  function setView(v) {
    if (v === view) return;
    view = v;
    tabs.forEach((t) => {
      const on = t.dataset.view === v;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
    });
    svg.classList.add("swap");
    setTimeout(() => { render(); svg.classList.remove("swap"); }, reduce ? 0 : 180);
  }

  tabs.forEach((t) => {
    t.tabIndex = t.getAttribute("aria-selected") === "true" ? 0 : -1;
    t.addEventListener("click", () => setView(t.dataset.view));
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const next = tabs[(tabs.indexOf(t) + 1) % tabs.length];
        next.focus();
        setView(next.dataset.view);
      }
    });
  });

  narrow.addEventListener("change", render);
  render();
})();
