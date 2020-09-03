const modal = new Modal();
const battle = new AnimeBattle();

modal.show();

modal.form.addEventListener('submit', (e) => {
    
    e.preventDefault();
    const formData = new FormData(modal.form);
    const data = modal.sendFormData(formData);
    const type = data.qq1;
    const players = Number(data.qq2);
    //modal.loading();

    //

if (type == 'Anime Top') {
    battle.getAnimeArray()
                    .then(array => battle.run(array, players))
                    .catch(err => console.log(`Произошла внезапная жопа - ${err}`))
} else if (type == 'Char Top') {
    battle.getCharArray()
    .then(array => battle.run(array, players))
    .catch(err => console.log(`Произошла внезапная жопа - ${err}`))
}


});




                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    






