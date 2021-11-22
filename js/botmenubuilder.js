$(()=>{
    botmenubuilder.init();
});

var botmenubuilder = {
    el:{
        debugger: true,
        builder: {
            elem: '#botmenubuilder',
            topLevelParent: '.js-botmenubuilder',
            body: '.js-botmenubuilderBody',
            section: {
                index: '.js-botmenubuilderItemIndex',
                item: '.js-botmenubuilderItem',
            },
            subSection: {
                main: '.js-botmenubuilderOptions',
                item: '.js-botmenubuilderOptionsItem',
                innerwrapper: '.js-botmenubuilderOptionsItemInnerWrapper',
            },
            item: {
            }
        }
    },
    init: ()=> {
        if(botmenubuilder.el.debugger) {
            console.log('init()');
        }
        if($(botmenubuilder.el.builder.elem).length > 0) {
            botmenubuilder.generateBuilderEssentials();
        }
    },
    generateBuilderEssentials: ()=> {
        if(botmenubuilder.el.debugger) {
            console.log('generateBuilderEssentials()');
        }
        let headerTemplate = `
        <div class="botmenubuilder__header">
          <div class="botmenubuilder__add__fields__wrapper">
            <ul class="botmenubuilder__add__fields">
              <li class="botmenubuilder__add__fields__item">
                  <button onclick="botmenubuilder.addSection(this)" class="button button-icontext button-icontext--iconlg button-hover-primary" type="button">
                      <i class="icon-chat"></i>
                      <span>Add a Top-level question</span>
                  </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="botmenubuilder__body js-botmenubuilderBody">
        </div>
        `;
        $(botmenubuilder.el.builder.elem).append(headerTemplate);
    },

    addSection: (elem)=> {
        if(botmenubuilder.el.debugger) {
            console.log('addSection()', elem);
        }
        let itemTemplate = `
        <div class="botmenubuilder__item js-botmenubuilderItem" data-botmenubuilder-q-uid="X_UID_X" id="X_UID_X">

            <div class="botmenubuilder__item__header">
                <h6>Question <span class="botmenubuilder__item__index js-botmenubuilderItemIndex">X_Q_INDEX_X</span></h6>
                <div>
                    <button onclick="botmenubuilder.removeSection(this)" type="button" title="remove" class="botmenubuilder__remove__field button button-icon button-icon--lg button-hover-danger">
                        <i class="icon-clear"></i>
                    </button>
                </div>
            </div>

            <div class="botmenubuilder__item__body">

                <div class="botmenubuilder__item__title">
                    <textarea name="botmenubuilder-title-X_UID_X" id="" placeholder="Title, ex: `+ botmenubuilder.generatePlaceHolder() +`" rows="1"></textarea>
                </div>

                <div class="botmenubuilder__item__options__wrapper">

                    <h6><strong>OPTIONS</strong></h6>

                    <div class="botmenubuilder__options js-botmenubuilderOptions">

                        <div class="botmenubuilder__options__item js-botmenubuilderOptionsItem" data-botmenubuilder-opt-index="X_OPT_INDEX_X">

                            <div class="botmenubuilder__options__item__inner__wrapper js-botmenubuilderOptionsItemInnerWrapper">
                                
                                <div class="botmenubuilder__options__parent">
                                    <i class="icon-drag_indicator"></i>
                                    <div class="botmenubuilder__options__field">
                                        <textarea name="botmenubuilder-option-X_UID_X-X_OPT_INDEX_X" id="X_UID_X-X_OPT_INDEX_X" placeholder="Title, ex: `+ botmenubuilder.generatePlaceHolder() +`" rows="1"></textarea>
                                        <ul class="botmenubuilder__options__actions">
                                            <li class="botmenubuilder__options__actions__item">
                                                <button onclick="botmenubuilder.addChildItem(this, 'X_UID_X', 'X_OPT_INDEX_X')" type="button" title="add sub option" class="botmenubuilder__addsub__option button button-icon button-icon--lg button-hover-primary"><i class="icon-playlist_add"></i></button>
                                            </li>
                                            <li class="botmenubuilder__options__actions__item">
                                                <button onclick="botmenubuilder.removeSubItem(this)" type="button" title="remove option" class="botmenubuilder__remove__option button button-icon button-icon--lg button-hover-danger"><i class="icon-clear"></i></button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <!-- loop here for multiple chlid  add botmenubuilder__options__item__inner__wrapper js-botmenubuilderOptionsItemInnerWrapper --> 
                                <div class="botmenubuilder__options__child">

                                </div>

                            </div>

                        </div>

                    </div>
                    <button onclick="botmenubuilder.addSubItem(this)" type="button" title="add option" class="botmenubuilder__add__option button  button-icontext button-fill button-fill-primary"><i class="icon-add"></i><span>add option</span></button>
                </div>
            </div>
            
        </div>
        `;
        
        const regexUid = /X_UID_X/ig;
        const regexQIndex = /X_Q_INDEX_X/ig;
        const regexOptIndex = /X_OPT_INDEX_X/ig;
        let uid = botmenubuilder.generateUUID();
        let optIndex = botmenubuilder.generateUUID();
        let qIndex = $(elem).parents(botmenubuilder.el.builder.topLevelParent).find(botmenubuilder.el.builder.body).find(botmenubuilder.el.builder.section.item).length + 1;
        itemTemplate = itemTemplate.replaceAll(regexUid, uid);
        itemTemplate = itemTemplate.replaceAll(regexQIndex, qIndex);
        itemTemplate = itemTemplate.replaceAll(regexOptIndex, optIndex);

        $(elem).parents(botmenubuilder.el.builder.topLevelParent).find(botmenubuilder.el.builder.body).append(itemTemplate);

        botmenubuilder.scrollToId(uid);
    },
    removeSection: (elem)=> {
        if(botmenubuilder.el.debugger) {
            console.log('removeSection()', elem);
        }
        if (confirm("Delete this top-level item along with its sub items (if have any)?")) {
            let currentBody = $(elem).parents(botmenubuilder.el.builder.body);

            $(elem).parents(botmenubuilder.el.builder.section.item).remove();

            let allitemsLeft = $(currentBody).find(botmenubuilder.el.builder.section.item);
            allitemsLeft.each(function(index) {
                let thisItem = $(allitemsLeft[index]);
                $(thisItem).find(botmenubuilder.el.builder.section.index).html( index+1 );
            });
        }

    },
    addSubItem: (elem)=> {
        if(botmenubuilder.el.debugger) {
            console.log('addSubItem()', elem);
        }

        let subItemTemplate = `
        <div class="botmenubuilder__options__item js-botmenubuilderOptionsItem" data-botmenubuilder-opt-index="X_OPT_INDEX_X">

            <div class="botmenubuilder__options__item__inner__wrapper js-botmenubuilderOptionsItemInnerWrapper">
                
                <div class="botmenubuilder__options__parent">
                    <i class="icon-drag_indicator"></i>
                    <div class="botmenubuilder__options__field">
                        <textarea name="botmenubuilder-option-X_UID_X-X_OPT_INDEX_X" id="X_UID_X-X_OPT_INDEX_X" placeholder="Title, ex: `+ botmenubuilder.generatePlaceHolder() +`" rows="1"></textarea>
                        <ul class="botmenubuilder__options__actions">
                            <li class="botmenubuilder__options__actions__item">
                                <button onclick="botmenubuilder.addChildItem(this, 'X_UID_X', 'X_OPT_INDEX_X')" type="button" title="add sub option" class="botmenubuilder__addsub__option button button-icon button-icon--lg button-hover-primary"><i class="icon-playlist_add"></i></button>
                            </li>
                            <li class="botmenubuilder__options__actions__item">
                                <button onclick="botmenubuilder.removeSubItem(this)" type="button" title="remove option" class="botmenubuilder__remove__option button button-icon button-icon--lg button-hover-danger"><i class="icon-clear"></i></button>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- loop here for multiple chlid  add botmenubuilder__options__item__inner__wrapper js-botmenubuilderOptionsItemInnerWrapper --> 
                <div class="botmenubuilder__options__child">

                </div>

            </div>

        </div>
        `;

        let parentWrapper = $(elem).parents(botmenubuilder.el.builder.section.item);
        let uid = $(parentWrapper).attr('data-botmenubuilder-q-uid');
        let optIndex = botmenubuilder.generateUUID();

        const regexUid = /X_UID_X/ig;
        const regexOptIndex = /X_OPT_INDEX_X/ig;
        subItemTemplate = subItemTemplate.replaceAll(regexUid, uid);
        subItemTemplate = subItemTemplate.replaceAll(regexOptIndex, optIndex);

        $(parentWrapper).find(botmenubuilder.el.builder.subSection.main).append(subItemTemplate);

        //focus to that textarea id
        $('#' + uid + '-' + optIndex).focus();
    },
    removeSubItem: (elem)=> {
        if(botmenubuilder.el.debugger) {
            console.log('removeSubItem()', elem);
        }

        if (confirm('Delete this sub-item and its contents?')) {
            // let currentWrapper = $(elem).parents(botmenubuilder.el.builder.subSection.main);
            let currentItem = $(elem).parents(botmenubuilder.el.builder.subSection.item);

            $(currentItem).remove()

            // let allitemsLeft = $(currentWrapper).find(botmenubuilder.el.builder.subSection.item);
            // allitemsLeft.each(function(index) {
            //     let thisItem = $(allitemsLeft[index]);
            //     $(thisItem).attr('data-botmenubuilder-opt-index', index+1);

            //     let findFirstField = $(thisItem).find('textarea').first();
                
            //     //rebuild id attr
            //     let getID = $(findFirstField).attr('id');
            //     let getIDArr = getID.split('-');
            //     getIDArr.pop();
            //     getID = getIDArr.join('-');
            //     $(findFirstField).attr('id', getID + '-' + (index+1));

            //     //rebuild name attr
            //     let getName = $(findFirstField).attr('name');
            //     let getNameArr = getName.split('-');
            //     getNameArr.pop();
            //     getName = getNameArr.join('-');
            //     $(findFirstField).attr('name', getName + '-' + (index+1));
            // });
        }

    },
    addChildItem: (elem, XUIDX = null, XOPTSUBINDEXX = null )=> {
        if(botmenubuilder.el.debugger) {
            console.log('addChildItem()', elem);
        }
        // TODO find a solution to populate the sub index / level
        let childTemplate = `
        <div class="botmenubuilder__options__item__inner__wrapper js-botmenubuilderOptionsItemInnerWrapper">
            
            <div class="botmenubuilder__options__parent">
                <i class="icon-drag_indicator"></i>
                <div class="botmenubuilder__options__field">
                    <textarea name="botmenubuilder-option-X_UID_X-X_OPTSUB_INDEX_X" id="X_UID_X-X_OPTSUB_INDEX_X" placeholder="Title, ex: `+ botmenubuilder.generatePlaceHolder() +`" rows="1"></textarea>
                    <ul class="botmenubuilder__options__actions">
                        <li class="botmenubuilder__options__actions__item">
                            <button onclick="botmenubuilder.addChildItem(this, 'X_UID_X', 'X_OPTSUB_INDEX_X')" type="button" title="add sub option" class="botmenubuilder__addsub__option button button-icon button-icon--lg button-hover-primary"><i class="icon-playlist_add"></i></button>
                        </li>
                        <li class="botmenubuilder__options__actions__item">
                            <button onclick="botmenubuilder.removeChildItem(this)" type="button" title="remove option" class="botmenubuilder__remove__option button button-icon button-icon--lg button-hover-danger"><i class="icon-clear"></i></button>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="botmenubuilder__options__child">

            </div>

        </div>
        `;
        
        //paretnwrapper
        let parentWrapper = $(elem).parents(botmenubuilder.el.builder.subSection.innerwrapper).first();
        //find the child
        let childWrapper = $(parentWrapper).find('.botmenubuilder__options__child').first();

        let numOfChildren = $(childWrapper).find(' > div').length + 1;

        //check for sub indexes
        // let subOptIndex = !!XOPTSUBINDEXX ? XOPTSUBINDEXX + "-" + numOfChildren : 0 + "-" + numOfChildren;
        let subOptIndex = !!XOPTSUBINDEXX ? XOPTSUBINDEXX + "-" + botmenubuilder.generateUUID() : 0 + "-" + botmenubuilder.generateUUID();

        const regexUid = /X_UID_X/ig;
        const regexOptSubIndex = /X_OPTSUB_INDEX_X/ig;
        let uid = !!XUIDX ? XUIDX : botmenubuilder.generateUUID();

        childTemplate = childTemplate.replaceAll(regexUid, uid);
        childTemplate = childTemplate.replaceAll(regexOptSubIndex, subOptIndex);

        $(childWrapper).append(childTemplate);

        // TODO
        //focus to that textarea id
        $('#' + uid + '-' + subOptIndex).focus();

    },
    removeChildItem: (elem)=>{
        if(botmenubuilder.el.debugger) {
            console.log('removeChildItem()', elem);
        }

        if (confirm('Delete this child-item and its contents?')) {
            let currentItem = $(elem).parents(botmenubuilder.el.builder.subSection.innerwrapper).first();

            $(currentItem).remove()
        }
    }, 
    generateUUID: ()=> {
        if(botmenubuilder.el.debugger) {
            console.log('generateUUID()');
        }
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxyxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },
    scrollToId: (theId)=> {
        $('html, body').animate({
            scrollTop: $("#" + theId).offset().top
        }, 1000);
    },
    generatePlaceHolder: ()=> {
        let easterEgg = [
            "Joey doesn’t share food!", "Well, the fridge broke, so I had to eat everything.", "These are just feelings. They’ll go away.",
            "You can’t just give up! Is that what a dinosaur would do?", "Here come the meat sweats.", "I like it. What’s not to like? Custard? Good. Jam? Good. Meat? Good.",
            "Look at me! I’m Chandler! Could I be wearing any more clothes?", "You hung up on the pizza place? I don’t hang up on your friends.", "I look a woman up and down and say, ‘Hey, how you doin’?'",
            "I don’t like it when people take food off my plate, OK?", "I’m curvy and I like it.", "Food? Oh, give me!", "Over the line? You’re so far past the line that you can’t even see the line! The line is a dot to you!",
            "So why don’t you be a grown-up and come and watch some TV in the fort?", "What am I gonna do? Keep trying to get rid of these feelings.", "Everything’s fine, it’s just a little crush.",
            "Pheebs, have you ever been bitten by a hungry Italian?", "You know, with that goatee, you kind of look like Satan."
        ];

        return easterEgg[Math.floor(Math.random()*easterEgg.length)];
    }
}