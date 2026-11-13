(function () {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  root.classList.add("js");
  if (reduce) root.classList.add("reduce");

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Terminal ---------- */
  const term = document.querySelector("#term code");
  const scenes = [
    {
      cmd: "kubectl get pods -n payments",
      out: [
        '<span class="dim">NAME                    READY   STATUS</span>',
        'txn-processor-7d9f      1/1     <span class="ok">Running</span>',
        'ledger-consumer-5c2a    1/1     <span class="ok">Running</span>',
        'fraud-events-9b1e       1/1     <span class="ok">Running</span>',
      ],
    },
    {
      cmd: "kafka-topics --list",
      out: [
        '<span class="c">payments.transactions.v1</span>',
        '<span class="c">ledger.postings.v2</span>',
        '<span class="c">fraud.signals.v1</span>',
        '<span class="dim">3 topics · 48 partitions</span>',
      ],
    },
  ];
  const prompt = '<span class="p">jijo@cloud</span><span class="dim">:~$</span> ';
  const caret = '<span class="caret"></span>';

  function renderStatic() {
    const s = scenes[0];
    term.innerHTML = prompt + s.cmd + "\n" + s.out.join("\n") + "\n" + prompt + caret;
  }

  if (term) {
    if (reduce) renderStatic();
    else runTerminal();
  }

  function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

  async function runTerminal() {
    await sleep(1300);
    let i = 0;
    for (;;) {
      const s = scenes[i % scenes.length];
      let typed = "";
      for (const ch of s.cmd) {
        typed += ch;
        term.innerHTML = prompt + typed + caret;
        await sleep(38 + Math.random() * 45);
      }
      await sleep(350);
      let body = prompt + s.cmd + "\n";
      for (const line of s.out) {
        body += line + "\n";
        term.innerHTML = body + caret;
        await sleep(170);
      }
      term.innerHTML = body + prompt + caret;
      await sleep(3600);
      i++;
    }
  }

  /* ---------- Hero parallax ---------- */
  const hero = document.querySelector(".hero");
  const visual = document.querySelector(".hero-visual");
  if (hero && visual && finePointer && !reduce) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      visual.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg) translate3d(${x * 8}px, ${y * 6}px, 0)`;
    });
    hero.addEventListener("pointerleave", () => (visual.style.transform = ""));
  }

  /* ---------- Card spotlight follows the pointer ---------- */
  if (finePointer) {
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest && e.target.closest(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }

  /* ---------- Counters ---------- */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (isNaN(target) || reduce) return;
    const t0 = performance.now(), D = 1600;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / D);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = "0" + suffix;
    requestAnimationFrame(step);
  }

  /* ---------- Scroll reveals ---------- */
  const revealSel = [
    ".stat", ".section-head", ".feature", ".job", ".case", ".arch", ".quote", ".skill", ".award", ".split > .card", ".contact-card",
  ].join(",");
  const items = document.querySelectorAll(revealSel);

  if ("IntersectionObserver" in window && !reduce) {
    items.forEach((el) => {
      const idx = [...el.parentElement.children].indexOf(el);
      el.style.setProperty("--d", `${(idx % 4) * 90}ms`);
      el.classList.add("reveal");
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          el.classList.add("in");
          const num = el.querySelector("[data-count]");
          if (num) setTimeout(() => countUp(num), parseInt(el.style.getPropertyValue("--d")) || 0);
          // Clear the stagger so hover transitions are instant afterwards.
          setTimeout(() => el.style.setProperty("--d", "0ms"), 1200);
          io.unobserve(el);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 12% 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Timeline progress ---------- */
  const timeline = document.querySelector(".timeline");
  const jobs = timeline ? [...timeline.querySelectorAll(".job")] : [];
  let fill = null;
  if (timeline) {
    const track = document.createElement("div");
    track.className = "track";
    track.setAttribute("aria-hidden", "true");
    fill = document.createElement("div");
    fill.className = "fill";
    track.appendChild(fill);
    timeline.appendChild(track);
  }
  function updateTimeline() {
    if (!timeline) return;
    const r = timeline.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (window.innerHeight * 0.55 - r.top) / r.height));
    fill.style.transform = `scaleY(${p})`;
    const reach = p * r.height;
    jobs.forEach((j) => j.classList.toggle("lit", j.offsetTop + 24 <= reach));
  }

  /* ---------- Header state and active section ---------- */
  const header = document.querySelector(".site-header");
  const links = [...document.querySelectorAll(".site-header nav a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
  function updateNav() {
    const y = window.innerHeight * 0.35;
    let current = -1;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= y) current = i; });
    links.forEach((a, i) => a.classList.toggle("active", i === current));
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle("scrolled", window.scrollY > 10);
      updateTimeline();
      updateNav();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();

/* ---------- Light/dark toggle ---------- */
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!btn) return;
  const current = () => (root.getAttribute("data-theme") === "light" ? "light" : "dark");
  const sync = () => {
    const t = current();
    btn.setAttribute("aria-label", t === "light" ? "Switch to dark theme" : "Switch to light theme");
    btn.setAttribute("aria-pressed", t === "light");
    if (meta) meta.setAttribute("content", t === "light" ? "#F4F6FB" : "#070B14");
  };
  btn.addEventListener("click", () => {
    const next = current() === "light" ? "dark" : "light";
    root.classList.add("theme-anim");
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    sync();
    setTimeout(() => root.classList.remove("theme-anim"), 450);
  });
  sync();
})();
