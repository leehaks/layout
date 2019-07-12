window.onload = function() {  
                                
    closeBtn(); 
    
    tab();
    
    modal();    
    
    slide(); 
    
    nav(); 
    
    dropMenu(); 

    includeHTML(); 
    
    document.body.addEventListener('click',function(e){
        
        let dropmenu = document.querySelector('.dropmenu.show')
        
        if( !dropmenu ){ return }
        
        dropmenu.classList.remove('show')
        setTimeout( function(){
            dropmenu.style.display = 'none'
        }, 300 ); 
    })
    
    let dropmenu = document.querySelectorAll('.dropmenu')
    
    for(let i=0; i<dropmenu.length; i++){ 
        dropmenu[i].addEventListener('click', function(e){
            e.stopPropagation();
        })
    }
}

function linkrm(){
    let navItem, i
    navItem = document.querySelectorAll('nav ul li a'); 
    for(i=0;i<navItem.length;i++){ navItem[i].classList.remove('active'); }
}

function nav() {
    let navItem, navSub, i, j, k, p, navTarget, pageTarget, sideContent, pageContent 
    
    navItem = document.querySelectorAll('nav ul li a'); 
    navSub = document.querySelector('.header-sub-menu'); 
    sideContent = document.querySelectorAll('.side-box'); 
    pageContent = document.querySelectorAll('.container-content')
    
    for(i=0;i<navItem.length;i++){
        
        navItem[i].addEventListener('click', function(e){
            e.preventDefault(); 

            navTarget = this.getAttribute('data-nav-target'); 
            pageTarget = this.getAttribute('data-page-target'); 

            if(this.classList.contains('active')) {
                navTarget ? this.classList.remove('active') : false; 
                navSub.classList.remove('show')
            }else{
                linkrm()
                this.classList.add('active')

                if(navTarget){ 
                    navSub.classList.add('show')
                    for(k=0;k<sideContent.length;k++) sideContent[k].classList.remove('show')
                    document.getElementById(navTarget).classList.add('show')
                }else{ 
                    navSub.classList.remove('show') 

                    for(p=0; p<pageContent.length; p++){ pageContent[p].classList.remove('show') }
                    document.getElementById(pageTarget).classList.add('on'); 
                    includeHTML(); 
                }
            }
        })
    }        
}

function closeBtn(){

    let closeBtn, closeBtnTarget, i

    closeBtn = document.querySelectorAll('.btn-close')
    for(i=0;i<closeBtn.length;i++){
        closeBtn[i].addEventListener('click', function(e){
            e.preventDefault(); 
            closeBtnTarget = this.getAttribute('data-target')
            document.getElementById(closeBtnTarget).classList.remove('show')
            linkrm()
        })
    }
}

function includeHTML(callback) { 

    let z, i, elmnt, file, xhr; 

    z = document.querySelectorAll('.container-content'); 

    for( i=0; i<z.length; i++){

        elmnt = z[i]; 
        file = elmnt.getAttribute('data-link'); 
        if(file){
            xhr = new XMLHttpRequest(); 
            xhr.onreadystatechange = function() { 
                if(this.readyState == 4) { 
                    if(this.status == 200) { elmnt.innerHTML = this.responseText }
                    if(this.status == 404) { elmnt.innerHTML = 'Page not Found.'}
                    elmnt.removeAttribute('include-html'); 
                    includeHTML(callback); 
                }
            }
            xhr.open('GET', file, true);
            xhr.send(); 

            return; 
        }
    }

    setTimeout( function(){
        callback();
    }, 0);

}

function dropMenu() { 
        
    let dropOnBtn = document.querySelectorAll('button.btn-drop')
    
    for(let i=0; i<dropOnBtn.length; i++){
        dropOnBtn[i].addEventListener('click', function(e){
            e.preventDefault(); 
            
            target = this.getAttribute('data-target');
            targetOn = document.getElementById(target)
            
            targetOn.style.display = 'block';
            
            setTimeout( function(){
                targetOn.classList.add('show');   
                
                if(targetOn.classList.contains('show')){
                    document.onkeydown = function(evt) {
                        evt = evt || window.event;
                        if (evt.keyCode == 27) {
                            targetOn.classList.remove('show');
                            setTimeout( function() {  
                                targetOn.style.display = 'none'
                            }, 500 ); 
                        }
                    };
                };
            }, 100 ); 
            
            return false;
        });
    };
}; 

function slide() { 

    let slideLeft = document.querySelectorAll('.slide-component .btn-arrow.left'); 
    let slideRight = document.querySelectorAll('.slide-component .btn-arrow.right'); 
    
    let viewImg = 1, num = 1, pos = 0;    
    
    for(let i=0; i<slideRight.length; i++){     
        
        slideRight[i].addEventListener('click', function(e){ 
            
            e.preventDefault(); 
            
            slide = this.getAttribute('data-target')
            slideAll = document.querySelectorAll('#' + slide + ' ul li');
            slidePage = document.querySelectorAll('#' + slide + ' ul li:not(:nth-child('+num+'))')  
            
            for(let j=0; j<slidePage.length; j++){ 
                slidePage[j].style.left= "100%"; 
                slidePage[j].style.zIndex= "0"; 
            }
            
            if(num >= slideAll.length) { 
                num = 1;
                viewImg = slideAll.length; 
            }else{ 
                num++; 
                viewImg = num-1; 
            }            
            
            pos="-100%"; 
            slideAct(num, viewImg, pos); 
        }); 
    }
    
    for(let i=0; i<slideLeft.length; i++){     
        
        slideLeft[i].addEventListener('click', function(e){ 
            
            e.preventDefault(); 
            
            slide = this.getAttribute('data-target')
            slideAll = document.querySelectorAll('#' + slide + ' ul li');
            slidePage = document.querySelectorAll('#' + slide + ' ul li:not(:nth-child('+num+'))')  
            
            for(let j=0; j<slidePage.length; j++){ 
                slidePage[j].style.left= "-100%"; 
                slidePage[j].style.zIndex= "0"; 
            }
            
            if(num <= 1) { 
                num = slideAll.length;
                viewImg = 1; 
            }else{ 
                num--; 
                viewImg = num+1; 
            }         
            
            pos="100%"; 
            slideAct( num, viewImg, pos); 
        }); 
    }
    
    function slideAct(num, viewImg, pos){ 
        document.querySelector('#' + slide + ' ul li:nth-child('+viewImg+')').style.zIndex = 0; 
        document.querySelector('#' + slide + ' ul li:nth-child('+viewImg+')').style.left = pos; 
        document.querySelector('#' + slide + ' ul li:nth-child('+num+')').style.left = '0px'; 
        document.querySelector('#' + slide + ' ul li:nth-child('+num+')').style.zIndex = '10'; 
    }            
}  

function modal() {
        
    let modalOffBtn = document.querySelectorAll('.modal-component .btn-modal-off');
    
    for(let i=0; i<modalOffBtn.length; i++){
        modalOffBtn[i].addEventListener('click', function(e){
            e.preventDefault(); 
            
            let modalBox = document.querySelectorAll('.modal-component'); 
            
            for(let i=0; i<modalBox.length; i++){
                modalBox[i].classList.remove('show');
                setTimeout( function() {  
                    modalBox[i].style.display = 'none'
                }, 300 ); 
            }
        }) 
    }
    
    let modalOnBtn = document.querySelectorAll('button.btn-modal')

    for(let i=0; i<modalOnBtn.length; i++){
        modalOnBtn[i].addEventListener('click', function(e){
            e.preventDefault(); 
            
            target = this.getAttribute('data-target')
            targetOn = document.getElementById(target)
            
            targetOn.style.display = 'block';
            
            setTimeout( function(){
                targetOn.classList.add('show');   
                
                if(targetOn.classList.contains('show')){
                    document.onkeydown = function(evt) {
                        evt = evt || window.event;
                        if (evt.keyCode == 27) {
                            targetOn.classList.remove('show');
                            setTimeout( function() {  
                                targetOn.style.display = 'none'
                            }, 500 ); 
                        }
                    };
                };
            }, 500 ); 
        });
    };
}

function tab() { 
        
    function check(component, target) {
        
        for(let i=0; i<component.length;i++) { 
            value.classList.contains('on') === true ? value.classList.remove('on') : undefined
        }
        
        // component.forEach( function(value) {
            //      value.classList.contains('on') === true ? value.classList.remove('on') : undefined
            // })
            
            target.classList.add('on');
        }
        
        // document.querySelectorAll('.tab-component').forEach( function(comp) {
            //     comp.querySelectorAll('.items a').forEach( function(a) {
                //         a.addEventListener('click', function(evt) {
                    //             evt.preventDefault(); 
                    
                    //             div = document.getElementById(a.getAttribute('href').replace('#', ''));
                    //             check(comp.querySelectorAll('.items a'), a);
                    //             check(comp.querySelectorAll('.panels div'), div);
                    //         })
                    //     })
                    // })
                    
            const tabLinks = document.querySelectorAll('.tab-items a')
            
            for(let i=0; i<tabLinks.length; i++) {
                tabLinks[i].addEventListener('click', function(e){
                    document.querySelector('.tab-items a.active').classList.remove('active');
                    document.querySelector('.panels .panel.on').classList.remove('on');
                    
                    this.classList.add('active'); 
                    attr = this.getAttribute('data-tab'); 
                    document.querySelector('.panels #'+attr).classList.add('on');
        })
    }
}







// function uuid() { 
//     function numId() { 
//         return ((1+ Math.random()) * 0x10000 | 0).toString(16).substring(1); 
//     }
//     return numId() + numId() + '-' + numId() + '-' + numId() + '-' + numId() + '-' + numId() + numId() + numId()
// }

// function toggleBtn() { 
//     let btnToggle = document.querySelectorAll('.btn-toggle');

//     for(let p of btnToggle){ 
    
//         let label = document.createElement('label');
//         let input = document.createElement('input');

//         input.type = "checkbox"
//         label.setAttribute('for',uuid());

//         let labelId = label.getAttribute('for');

//         input.setAttribute('id', labelId);

//         p.prepend(input);
//         p.appendChild(label);
//     }
// }

// toggleBtn();
                
// function alertBox() {
    
//     let alertBox = document.querySelectorAll('.alert');

//     for(let p of alertBox){ 
    
//         let icon = document.createElement('i'),
//             iconText = document.createElement('span'), 
//             alertClass = p.getAttribute('class').replace('alert ','');       

//         let iconName = { 
//             success: 'far fa-check-circle',
//             warning: 'far fa-frown', 
//             info: 'far fa-laugh', 
//             error: 'far fa-times-circle', 
//         }               

//         icon.classList = iconName[alertClass];

//         iconText.innerText = alertClass;
//         iconText.prepend(icon);

//         p.prepend(iconText);
//     }
// }
            
// alertBox();  

// function chkBox() { 
//     let chk = document.querySelectorAll('.chk-group input');        

//     for(let p of chk){ 
    
//         let chkLabel = document.createElement('label');

//         chkLabel.innerText = p.getAttribute('value');
//         chkLabel.setAttribute('for', p.getAttribute('id'));

//         p.setAttribute('type','checkbox')
//         p.after(chkLabel)
//     };
// }

// chkBox();   

// function rdoBox() { 
//     let rdo = document.querySelectorAll('.rdo-group input');

//     for(let p of rdo){
    
//         let rdoLabel = document.createElement('label'); 

//         rdoLabel.innerText = p.getAttribute('value'); 
//         rdoLabel.setAttribute('for', p.getAttribute('id')); 

//         p.setAttribute('type', 'radio');
//         p.after(rdoLabel);
//     }
// }

// rdoBox();