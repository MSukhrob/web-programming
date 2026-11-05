// ===========================================================
// performance homework - script (not minified, not deferred)
// ===========================================================

// 1) a "heavy" calculation that blocks the main thread while the page loads
function heavyCalculation(ms) {
  var start = Date.now();
  var total = 0;
  while (Date.now() - start < ms) {
    for (var i = 0; i < 100000; i++) {
      total += Math.sqrt(i) * Math.sin(i);
    }
  }
  return total;
}

heavyCalculation(900);

// 2) a notice banner added late: it pushes the whole page down
window.addEventListener('load', function () {
  setTimeout(function () {
    var banner = document.createElement('div');
    banner.className = 'notice';
    banner.textContent = 'new: photo gallery updated this week';
    document.body.insertBefore(banner, document.body.firstChild);
  }, 400);
});

// 3) a few more blocking tasks
heavyCalculation(500);
