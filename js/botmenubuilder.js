var botmenubuilder = {
    el:{},
    init: ()=> {},
    generatePlaceHolder: function(){
        let easterEgg = [
            "Joey doesn’t share food!", "Well, the fridge broke, so I had to eat everything.", "These are just feelings. They’ll go away.",
            "You can’t just give up! Is that what a dinosaur would do?", "Here come the meat sweats.", "I like it. What’s not to like? Custard? Good. Jam? Good. Meat? Good.",
            "Look at me! I’m Chandler! Could I be wearing any more clothes?", "You hung up on the pizza place? I don’t hang up on your friends.", "I look a woman up and down and say, ‘Hey, how you doin’?'",
            "I don’t like it when people take food off my plate, OK?", "I’m curvy and I like it.", "Food? Oh, give me!"
        ];

        return easterEgg[Math.floor(Math.random()*easterEgg.length)];
    }
}