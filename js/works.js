//== 作品紹介スライド制御 ==
const carousel = document.getElementById("carousel");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const visibleCount = 3;
const gap = 30;

const originalItems = Array.from(carousel.children);
const originalCount = originalItems.length;

let items = Array.from(carousel.children);
const itemWidth = items[0].offsetWidth;
const step = itemWidth + gap;


// クローン作成
const headClones = items.slice(-visibleCount).map(n => n.cloneNode(true));
const tailClones = items.slice(0, visibleCount).map(n => n.cloneNode(true));

headClones.forEach(n => carousel.insertBefore(n, carousel.firstChild));
tailClones.forEach(n => carousel.appendChild(n));

items = Array.from(carousel.children);

let isAnimating = false;

// 初期位置
let index = visibleCount;
move(false);



function move(animate = true) 
{
  carousel.style.transition = animate ? "transform 0.4s ease" : "none";
  carousel.style.transform = `translateX(${-step * index}px)`;
}

// 右
next.onclick = () => {
  if (isAnimating) return;
  isAnimating = true;

  index++;
  move(true);

  carousel.addEventListener("transitionend", () => 
  {
    // 端処理
    if (index === items.length - visibleCount) 
    {
      index = visibleCount;
      move(false);
    }
    isAnimating = false;
  }, { once: true });
};

// 左
prev.onclick = () => 
{
  if (isAnimating) return;
  isAnimating = true;

  index--;
  move(true);

  carousel.addEventListener("transitionend", () => 
  {
    // 左端に到達したら本物の最後へ
    if (index === visibleCount - 1) 
    {
      index = originalCount + visibleCount - 1;
      move(false);
    }
    isAnimating = false;
  }, { once: true });
};


//== モーダル制御 ==
// 作品データ
const works = 
{
  1: { title: "もちもちあにまるず"},
  2: { title: "タイトル"},
  3: { title: "タイトル"},
  4: { title: "タイトル"}
};

// 要素取得
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeBtn = document.getElementById("closeModal");
const modalBg = document.getElementById("modalBg");

const modalImage = document.getElementById("modalImage");
const modalVideo = document.getElementById("modalVideo");
const modalYoutube = document.getElementById("modalYoutube");

// 画像クリック
document.querySelectorAll(".work-btn").forEach(btn => 
{
  btn.addEventListener("click", e => 
  {
    e.stopPropagation(); // カルーセル対策
    const id = btn.dataset.id;
    openModal(id);
  });
});

function openModal(id) 
{
  const w = works[id];

 // タイトル
  modalTitle.textContent = w.title;

  // HTMLに書いた説明文を取得
  const source = document.getElementById(`work-text-${id}`);
  modalText.innerHTML = source ? source.innerHTML : "";

  modal.classList.add("show");
}


// 閉じる
closeBtn.onclick = closeModal;
modalBg.onclick = closeModal;

function closeModal() 
{
  modal.classList.remove("show");

  modalVideo.pause();
  modalVideo.src = "";
  modalYoutube.src = "";
}