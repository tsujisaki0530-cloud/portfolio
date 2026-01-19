
//== AboutMeタブ切り替え ==
document.addEventListener('DOMContentLoaded', () => 
{

    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab_content');

    tabs.forEach(tab => 
    {
        tab.addEventListener('click', () => 
        {

            // 全部リセット
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // 押されたタブを有効化
            tab.classList.add('active');
            const target = tab.dataset.tab;
            document.getElementById(target).classList.add('active');
        });
    });

});


