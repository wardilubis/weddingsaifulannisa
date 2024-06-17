(function() {
  "use strict";
  const countdown = document.querySelector('.countdown');
  const output = countdown.innerHTML;
  const targetDate = new Date("2024-07-07T07:00:00");

  const countDownDate = function() {
    const now = new Date().getTime();
    const timeleft = targetDate.getTime() - now;

    if (timeleft <= 0) {
      countdown.innerHTML = "Waktu hitung mundur telah berakhir!";
      return;
    }

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    countdown.innerHTML = output.replace('%d', days).replace('%h', hours).replace('%m', minutes).replace('%s', seconds);
  }

  countDownDate();
  setInterval(countDownDate, 1000);
})();