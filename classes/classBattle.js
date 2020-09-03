class AnimeBattle {

    constructor() {
        this.res = './db/json/ani/titles.json'
        this.resChar = './db/json/char/chars.json'
        this.reArray = [];
        this.looseArray = [];
        this.title1_img = document.querySelector('.title-1-title-img .title-img-container')
        this.title2_img = document.querySelector('.title-2-title-img .title-img-container')
        this.title1_title = document.querySelector('.title-1-title-info .title-info-container')
        this.title2_title = document.querySelector('.title-2-title-info .title-info-container')
        this.title1_score = document.querySelector('.title-1-title-info .score')
        this.title2_score = document.querySelector('.title-2-title-info .score')
        this.progress = document.querySelector('.progress')
        this.progress_logo = document.querySelector('.progress-logo')

}
    

// get an Array of titles



async getAnimeArray() {
    const resp = await fetch(this.res);
    const data = await resp.json();
    return data;  
}

async getCharArray() {
    const resp = await fetch(this.resChar);
    const data = await resp.json();
    return data;   
}



// shuffling an array

arrayShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;    
}

// getting 2 titles for the battle fron the array

get2titles(array) {
    let title1 = array.pop();
    let title2 = array.shift();
    const btl = {
        title1: title1,
        title2: title2,
        array: array
    }
    return btl;
    
}

changeTitle(target) {
    target.classList.add('checked')    
    target == this.title1_img ? this.title2_img.classList.add('unchecked') : this.title1_img.classList.add('unchecked');
    setTimeout(() => {
        this.title1_img.classList.remove('checked')
        this.title1_img.classList.remove('unchecked')
        this.title2_img.classList.remove('checked')
        this.title2_img.classList.remove('unchecked')
    }, 500)
}



// changeClick
changeClick = (target, nontarget, title1, title2, array) => {
    nontarget.onclick = () => false;
    this.changeTitle(target);
    setTimeout(() => {
        const winTitle = title1;
        const looseTitle = title2;
        if (array.length == 0 && this.reArray == 0) {
            this.looseArray.unshift(looseTitle);
            this.looseArray.unshift(winTitle);
            console.log(`Победил тайтл - ${winTitle.title}`);
            target.closest('section').classList.add('winner')
            nontarget.closest('section').remove();
            this.progress.remove();
            this.progress_logo.remove();
            const scor = document.querySelector('.score');
            scor.classList.add('final-score');
            scor.textContent = 'Winner';
            console.log(this.looseArray);
            const tatar = document.querySelector('.winner').querySelector('.title-img-container');
            tatar.classList.add('finaltable');
            tatar.classList.remove('checked');
            const table = document.querySelector('.winner').querySelector('.title-img');
            table.classList.add('total');
            // final table
            let list = '';
            this.looseArray.splice(0, 6).forEach(title => {
                list += `<li class="list-title">
                    <div class="list-title-div">
                        <div style="padding-right: 20px">${title.title}</div>
                        <div class="list-title-img" style="background-image: url(${title.image_url})"></div>
                    </div>
                    </li>`
            })
            //
            table.innerHTML += `<div class="tt"><ul>${list}</ul></div>`;

        } else {
            this.reArray.push(winTitle);
            this.looseArray.unshift(looseTitle);
            this.fight(array);
        }
    }, 500)
    target.onclick = () => false;
}


// fight!!!


fight(array) {
    if (this.reArray.length == 0) {
        this.progress.textContent = `1/${array.length / 2}`;
    }
    if (array.length > 1) {
        this.arrayShuffle(array);
        const battleObj = this.get2titles(array);
        this.title1_img.style.backgroundImage = `url(${battleObj.title1.image_url})`;
        this.title2_img.style.backgroundImage = `url(${battleObj.title2.image_url})`;
        this.title1_title.textContent = battleObj.title1.title;
        this.title2_title.textContent = battleObj.title2.title;
        this.title1_score.textContent = battleObj.title1.score || battleObj.title1.rank;
        this.title2_score.textContent = battleObj.title2.score || battleObj.title2.rank;
        this.title1_img.onclick = () => this.changeClick(this.title1_img, this.title2_img, battleObj.title1, battleObj.title2, array);
        this.title2_img.onclick = () => this.changeClick(this.title2_img, this.title1_img, battleObj.title2, battleObj.title1, array);
    } else {
        let arrayY = this.reArray;
        if (arrayY.length == 2) {
            this.finalFight(arrayY)
            return false;
        }
        this.reArray = [];
        this.fight(arrayY);
    }

}

finalFight(array) {
    const battleObj = this.get2titles(array);
    this.progress.textContent = 'FINAL';
    this.title1_img.style.backgroundImage = `url(${battleObj.title1.image_url})`;
    this.title2_img.style.backgroundImage = `url(${battleObj.title2.image_url})`;
    this.title1_title.textContent = battleObj.title1.title;
    this.title2_title.textContent = battleObj.title2.title;
    this.title1_score.textContent = battleObj.title1.score || battleObj.title1.rank;
    this.title2_score.textContent = battleObj.title2.score || battleObj.title2.rank;
    this.title1_img.onclick = () => this.changeClick(this.title1_img, this.title2_img, battleObj.title1, battleObj.title2, array);
    this.title2_img.onclick = () => this.changeClick(this.title2_img, this.title1_img, battleObj.title2, battleObj.title1, array);
    console.log(this.looseArray);
    return false;
}

run(array, players) {

    const SplicedArray = array.splice(0, players);
    const trtrtr = [...SplicedArray]
    console.log(trtrtr);
    this.fight(SplicedArray);
    modal.hide()

}

}



                      






