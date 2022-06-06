
    const api_url = "data/anime.json";
    async function getData() {
        const repos = await fetch(api_url);
        const data = await repos.json();
        for(let i=0; i<data.length; i++) {
            var sliderso = document.getElementById("sliederso");
            sliderso.innerHTML += 
            `
                <div class="media-block" style="width: 227px; margin-left: 0px;">
                    <div class="content-box">
                        <a href="post/anime.php?id=${data[i].anime_posts_unique_id}" class="fullClick"></a>
                        <a href="post/anime.php?id=${data[i].anime_posts_unique_id}" class="image">
                            <img alt="${data[i].title}" src="images/${data[i].img}" >
                        </a>
                        <span class="coloros quality" id="${data[i].states}" style=" font-size:20px;">${data[i].state}</span>
                        <span class="rate ti-star">${data[i].evaluate}</span>
                        <span class="category">${data[i].location}</span>
                        <a href="post/anime.php?id=${data[i].anime_posts_unique_id}" class="ti-slow-motion play-btn"></a>
                        <div class="hvr">
                            <div class="genres">
                                <span>${data[i].type_1}</span>
                                <span>${data[i].type_2}</span>
                                <span>${data[i].type_3}</span>
                            </div>
                            <a href="post/anime.php?id=${data[i].anime_posts_unique_id}"><h3>${data[i].title}</h3></a>
                        </div>
                    </div>
                </div>
            `;

            var myMenu = document.getElementById("myMenu");
            myMenu.innerHTML += 
            `
                <div class="box-5x1 col-6 media-block" id="anime">
                    <div class="content-box">
                        <a href="post/anime.php?id=${data[i].anime_posts_unique_id}" title="${data[i].title}" class="fullClick"></a>
                        <a href="post/anime.php?id=${data[i].anime_posts_unique_id}" class="image">
                            <img alt="${data[i].title}" src="images/${data[i].img}" >
                        </a>
                        <span class="coloros quality" id="${data[i].states}" style=" font-size:20px;">${data[i].state}</span>
                        <span class="rate ti-star">${data[i].evaluate}</span>
                        <span class="category">${data[i].location}</span>
                        <span class="episode-block"><span>الحلقة </span><span>${data[i].episode_number}</span></span>
                        <a href="post/anime.php?id=${data[i].anime_posts_unique_id}" class="ti-slow-motion play-btn"></a>
                        <div class="hvr">
                            <div class="genres">
                                <span>${data[i].type_1}</span>
                                <span>${data[i].type_2}</span>
                                <span>${data[i].type_3}</span>
                            </div>
                            <a href="post/anime.php?id=${data[i].anime_posts_unique_id}"><h3>${data[i].title}</h3></a>
                        </div>
                    </div>
                </div>
            `;
        }
    }


getData();

