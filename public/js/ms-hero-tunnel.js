/**
 * MS LOGISTICS — 3D Perspective Gallery Tunnel Background (OriginKit Hero 03)
 * Custom Three.js Infinite Perspective Logistics Tunnel
 */

(function () {
  'use strict';

  const TUNNEL_IMAGES = [
    'images/logistics_tunnel_01.png',
    'images/logistics_tunnel_02.png',
    'images/logistics_tunnel_03.png',
    'images/logistics_tunnel_04.png',
    'images/logistics_tunnel_05.png',
    'images/logistics_tunnel_06.png',
    'images/logistics_tunnel_07.png',
    'images/air_freight.png',
    'images/ocean_freight.png',
    'images/road_transport.png',
    'images/about_logistics.png',
  ];

  const PALETTE = ['#FF5722', '#2563EB', '#F59E0B', '#10B981', '#3B82F6', '#6366F1'];

  const TUNNEL_WIDTH = 2.6;
  const TUNNEL_HEIGHT = 2.2;
  const SEGMENT_DEPTH = 1.1;
  const NUM_SEGMENTS = 18;
  const LINE_RADIUS = 0.0035;

  function initHeroTunnel() {
    const container = document.getElementById('msHeroTunnelContainer');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#060B16');

    const fogNear = 3;
    const fogFar = NUM_SEGMENTS * SEGMENT_DEPTH * 1.35;
    scene.fog = new THREE.Fog(new THREE.Color('#060B16'), fogNear, fogFar);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.className = 'ms-hero-tunnel-canvas';
    container.appendChild(renderer.domElement);

    const lineMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#2563EB'),
      transparent: true,
      opacity: 0.55,
    });

    const loader = new THREE.TextureLoader();
    const imageMats = TUNNEL_IMAGES.map((url) => {
      const mat = new THREE.MeshBasicMaterial({
        transparent: false,
        opacity: 1.0,
        side: THREE.DoubleSide,
      });
      loader.load(url, (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        mat.map = tex;
        mat.needsUpdate = true;
      });
      return mat;
    });

    const colorMats = PALETTE.map(
      (hex) =>
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(hex),
          transparent: true,
          opacity: 0.55,
          side: THREE.DoubleSide,
        })
    );

    const hw = TUNNEL_WIDTH / 2;
    const hh = TUNNEL_HEIGHT / 2;
    const cols = 5;
    const rows = 5;
    const colW = TUNNEL_WIDTH / cols;
    const rowH = TUNNEL_HEIGHT / rows;

    const geoFloor = new THREE.PlaneGeometry(colW, SEGMENT_DEPTH);
    const geoWall = new THREE.PlaneGeometry(SEGMENT_DEPTH, rowH);

    const geoTubeZ = new THREE.TubeGeometry(
      new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -SEGMENT_DEPTH)),
      1,
      LINE_RADIUS,
      6
    );
    const geoTubeX = new THREE.TubeGeometry(
      new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(TUNNEL_WIDTH, 0, 0)),
      1,
      LINE_RADIUS,
      6
    );
    const geoTubeY = new THREE.TubeGeometry(
      new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, TUNNEL_HEIGHT, 0)),
      1,
      LINE_RADIUS,
      6
    );

    const tube = (geo, x, y, z = 0) => {
      const m = new THREE.Mesh(geo, lineMaterial);
      m.position.set(x, y, z);
      return m;
    };

    const SLOTS = [];
    const z = -SEGMENT_DEPTH / 2;
    for (let i = 0; i < cols; i++) {
      const x = -hw + i * colW + colW / 2;
      SLOTS.push({ geo: geoFloor, pos: new THREE.Vector3(x, -hh, z), rot: new THREE.Euler(-Math.PI / 2, 0, 0) });
      SLOTS.push({ geo: geoFloor, pos: new THREE.Vector3(x, hh, z), rot: new THREE.Euler(Math.PI / 2, 0, 0) });
    }
    for (let i = 0; i < rows; i++) {
      const y = -hh + i * rowH + rowH / 2;
      SLOTS.push({ geo: geoWall, pos: new THREE.Vector3(-hw, y, z), rot: new THREE.Euler(0, Math.PI / 2, 0) });
      SLOTS.push({ geo: geoWall, pos: new THREE.Vector3(hw, y, z), rot: new THREE.Euler(0, -Math.PI / 2, 0) });
    }

    let populateIndex = 0;
    let imageIndex = 0;
    let colorIndex = 0;

    function populate(group) {
      const takesSlabs = populateIndex % 2 === 0;
      populateIndex++;
      const slabs = group.userData.slabs;

      for (const slab of slabs) {
        if (!takesSlabs || Math.random() > 0.85) {
          slab.visible = false;
          continue;
        }
        slab.visible = true;
        if (Math.random() > 0.12) {
          slab.material = imageMats[imageIndex % imageMats.length];
          imageIndex++;
        } else {
          slab.material = colorMats[colorIndex % colorMats.length];
          colorIndex++;
        }
      }
    }

    function createSegment(zPos) {
      const group = new THREE.Group();
      group.position.z = zPos;

      for (let i = 0; i <= cols; i++) {
        const x = -hw + i * colW;
        group.add(tube(geoTubeZ, x, -hh));
        group.add(tube(geoTubeZ, x, hh));
      }
      for (let i = 1; i < rows; i++) {
        const y = -hh + i * rowH;
        group.add(tube(geoTubeZ, -hw, y));
        group.add(tube(geoTubeY, hw, y));
      }
      group.add(tube(geoTubeX, -hw, -hh));
      group.add(tube(geoTubeX, -hw, hh));
      group.add(tube(geoTubeY, -hw, -hh));
      group.add(tube(geoTubeY, hw, -hh));

      const slabs = SLOTS.map((slot) => {
        const m = new THREE.Mesh(slot.geo, colorMats[0]);
        m.position.copy(slot.pos);
        m.rotation.copy(slot.rot);
        m.visible = false;
        group.add(m);
        return m;
      });
      group.userData.slabs = slabs;
      populate(group);
      return group;
    }

    const segments = [];
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      const g = createSegment(-i * SEGMENT_DEPTH);
      scene.add(g);
      segments.push(g);
    }

    let scrollPos = 0;
    let lastTime = 0;

    function animate(now) {
      requestAnimationFrame(animate);
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 1 / 30) : 1 / 60;
      lastTime = now;

      scrollPos += 0.28 * dt;
      const targetZ = -scrollPos * 1.5;
      camera.position.z += 0.05 * (targetZ - camera.position.z);

      const zCur = camera.position.z;
      for (const seg of segments) {
        if (seg.position.z > zCur + SEGMENT_DEPTH) {
          let minZ = 0;
          for (const s of segments) minZ = Math.min(minZ, s.position.z);
          seg.position.z = minZ - SEGMENT_DEPTH;
          populate(seg);
        }
      }

      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);

    function onResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroTunnel);
  } else {
    initHeroTunnel();
  }
})();
