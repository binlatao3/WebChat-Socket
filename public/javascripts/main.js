const socket = io('http://localhost:8080', { transports : ['websocket'] });
const menuinfor = document.querySelector('.name-friend__menu');
const menuDetail = document.querySelector('.menu-detail');
const wrapper = document.querySelector('.wrapper');
const menuCircle = document.querySelector('.menu-circle');
const addFirend = document.querySelector('.content-infor__add');
const modalAdd = document.querySelector('.modal-friend');
const btnCloseAdd = document.querySelector('.btn-close-modal-friend');
const iconCloseModalAdd = document.querySelector('.js-close-add i');
const iconCloseModalGroup = document.querySelector('.js-close-group i');
const createGroup = document.querySelector('.create-group');
const modalGroup = document.querySelector('.modal-group');
const btnCloseGroup = document.querySelector('.btn-close-modal-group');
const contentMessage = document.querySelectorAll('.content-message span');
const contentMessageGroup = document.querySelectorAll('.content-group-infor__name p');
const errorMessage = document.querySelector('.error-message');

const showPass = document.querySelector('#password');
const iconHidePass = document.querySelector('.hide-pass')
const iconShowPass = document.querySelector('.show-pass')


if(showPass){
    iconHidePass.addEventListener('click', (e) => {
        iconHidePass.style.visibility = 'hidden'
        iconShowPass.style.visibility = 'visible'
        showPass.setAttribute('type','text')
    });

    iconShowPass.addEventListener('click', (e) => {
        iconHidePass.style.visibility = 'visible'
        iconShowPass.style.visibility = 'hidden'
        showPass.setAttribute('type','password')
    });
}

const btnLogin = document.getElementById('submit-login');

if(btnLogin){

    username.onfocus = function(){
        errorMessage.innerText = '';
        clearError()
    }

    password.onfocus = function(){
        errorMessage.innerText = '';
        clearError()
    }

    // btnLogin.addEventListener('click', (e) => {
    //     var username = document.querySelector('#username');
    //     var password = document.querySelector('#password');
    //     if(username.value == ''){
    //         e.preventDefault();
    //         errorMessage.innerText = 'Username not entered'
    //         styleError()
    //     }else if(username.value != 'admin'){
    //         e.preventDefault();
    //         errorMessage.innerText = 'Username does not exist'
    //         styleError()
    //     }else if(password.value == ''){
    //         e.preventDefault();
    //         errorMessage.innerText = 'Password not entered'
    //         styleError()
    //     }
    //     else if(password.value != '123'){
    //         e.preventDefault();
    //         errorMessage.innerText = 'Incorrect password'
    //         styleError()
    //     }
    // });
}


const btnSignup = document.querySelector('#submit-signup')

if(btnSignup){
    fullname.onfocus = function(){
        errorMessage.innerText = '';
        clearError()
    }

    username.onfocus = function(){
        errorMessage.innerText = '';
        clearError()
    }

    password.onfocus = function(){
        errorMessage.innerText = '';
        clearError()
    }
}

function clearError(){
    errorMessage.style.padding = '0'
}


if(menuinfor){
    menuinfor.addEventListener('click', showMenuDetail);
    wrapper.addEventListener('click', hideMenuDetail);
    menuDetail.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

if(addFirend){
    addFirend.addEventListener('click',showModalAddFriend)
    btnCloseAdd.addEventListener('click', hideModalAddFriend)
    iconCloseModalAdd.addEventListener('click', hideModalAddFriend)
}


if(createGroup){
    createGroup.addEventListener('click', showModalGroup)
    btnCloseGroup.addEventListener('click', hideModalGroup)
    iconCloseModalGroup.addEventListener('click', hideModalGroup)
}

function showMenuDetail(e){
    menuDetail.classList.toggle('active');
    menuCircle.style.fill = "#3dbfbf";
    e.stopPropagation();
}

function hideMenuDetail(){
    menuCircle.style.fill = "#8a929b";
    menuDetail.classList.remove('active');
}

function showModalAddFriend(){
    modalAdd.classList.add('active');
}

function hideModalAddFriend(){
    document.querySelector('.modal-add-friend__input input').value = ''
    modalAdd.classList.remove('active');
}

function showModalGroup(){
    modalGroup.classList.add('active')
}

function hideModalGroup(){
    modalGroup.classList.remove('active')
}

// document.addEventListener('DOMContentLoaded', (event) => {
//     console.log(contentMessage.textContent)

//     for(i = 0 ;i <= contentMessage.length; i++){
//         if(contentMessage[i].textContent.length > 38){
//             const s = contentMessage[i].textContent.substring(0,38) + '...';
//             contentMessage[i].textContent = s;
//         }
//     }
// });


$(document).ready(function(){
    $("form#submitform").submit(function(event) {

        event.preventDefault();
        var text = $('#mytext').val()
        var friend = $('.content-message__friend').attr('id')

        $('#sendtext').attr('disabled', 'disabled');
        // console.log(text)

        $.ajax({
            type: "POST",
            data: {
                mytext: text,
                friend:friend
            },
            dataType: "json",
            cache : false,
            success: function(data){


                var time = ''
                var dateText = new Date(getTime(data.createAt))
                var nowDate = new Date(getTime())
                var diffMs = (nowDate - dateText);
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                var diffSecs = Math.round((nowDate - dateText)) / 1000
                
                if(diffSecs >= 0 && diffMins == 0)
                {
                    time = 'Just now'
                }

                const timeCounter = () => {
                    var dateText = new Date(getTime(data.createAt))
                    let dateToShow;
                    const showTime = () => {
    
                        var nowDate = new Date(getTime())
                        var diffMs = (nowDate - dateText);
                        var diffDays = Math.floor(diffMs / 86400000); // days
                        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                        var diffSecs = Math.round((nowDate - dateText)) / 1000
    
                        if(diffSecs >= 0 && diffMins == 0)
                        {
                            dateToShow = 'Just now'
                        }
                        else if(diffMins >= 1 && diffHrs == 0)
                        {
                            dateToShow = diffMins + ' min'
                        }
                        else if(diffHrs >= 1 && diffDays == 0)
                        {
                            dateToShow = diffHrs + ' hours'
                        }
                        else if(diffHrs > 24)
                        {
                            dateToShow = diffDays + ' day'
                        }
                        if(myId === $(`#timeText-${myId}`).attr('name'))
                        {
                            $(`#timeText-${myId}`).text(dateToShow)
                        }
                    };
    
                    const timer = setInterval(() => {showTime()},60000);
                };
                  
                timeCounter()
                
                $('#sendtext').attr('name',friend);
                var myId = $('.infordetail-id').html()
                socket.emit('send-chat-message', {
                    message:data.mytext,
                    friendId:friend,
                    myId:myId,
                    time:time,
                    createAt:data.createAt,
                })

                socket.emit('unchecked-chat-message',{
                    mytext:data.mytext,
                    receiver:friend,
                    sender:myId,
                    time:time,
                    createAt:data.createAt,
                })

                $('.send-message').append(`
                    <div class="my-message">
                        <img class="img-heading"  src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                        <div class="content-my-message">
                            <div class="message" style="position: relative;">
                                <p id = "mysendtext">${data.mytext}</p>
                                <div class="message-content" style="position: absolute; top: 100%; right: 0; max-width: max-content; max-height: 200px; overflow: auto;">
                                    <ul class="options" style="padding: 0; margin: 0; list-style: none;">
                                        <li style="padding: 5px;">Xóa</li>
                                        <li style="padding: 5px;">Gỡ bỏ</li>
                                        <li style="padding: 5px;">Chuyển tiếp</li>
                                        <li style="padding: 5px;">Ghim</li>
                                    </ul>
                                </div>
                            </div>
                            <p name = "${myId}" id = "timeText-${myId}" class="content-message__minute">${time}</p>
                        </div>
                    </div>
                `);
                const element = $(`#sendmessage`);
                    element.animate({
                    scrollTop: element.prop("scrollHeight")
                }, 1000);
            }
        });
        $('#mytext').val('');
    });
});

socket.on('receive-last-message-sender',data =>{

    // localStorage.setItem("color",data.color)
    // localStorage.setItem("weight",data.bold)
    // localStorage.setItem("friendId",data.message.friendId)

    var slides = document.getElementsByClassName("border-bt");
    var friend = []
    for (var i = 0; i < slides.length; i++) {
        friend.push({
            friendId: slides[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[3].innerHTML,
            friendName: slides[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[1].innerHTML,
            rawDate:slides[i].childNodes[1].childNodes[3].childNodes[3].childNodes[3].childNodes[1].className,
            text:document.getElementById(`content-messag_detail-${slides[i].id}`).innerHTML,
            fontweight:slides[i].childNodes[1].childNodes[5].childNodes[1].style.fontWeight,
            color:slides[i].childNodes[1].childNodes[5].childNodes[1].style.color
        })
    }

    $('.list-friend').empty()
    var newReceiver = []
    for (var i = 0; i < friend.length; i++) {

        var trueId = friend[i].friendId
        var trueName= friend[i].friendName
        var friendMesage=friend[i].text
        var friendRawDate = friend[i].rawDate

        if(parseInt(trueId) == data.friendId)
        {
            var time = ''
            var dateText = new Date(getTime(data.createAt))
            var nowDate = new Date(getTime())
            var diffMs = (nowDate - dateText);
            var diffDays = Math.floor(diffMs / 86400000); // days
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
            var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
            var diffSecs = Math.round((nowDate - dateText)) / 1000
            
            if(diffSecs >= 0 && diffMins == 0)
            {
                time = 'now'
            }
            else if(diffMins >= 1 && diffHrs == 0)
            {
                time = diffMins + 'm'
            }
            else if(diffHrs >= 1 && diffDays == 0)
            {
                time = diffHrs + 'ho'
            }
            else if(diffHrs > 24)
            {
                time = diffDays + 'd'
            }
        
            const timeCounter = () => {
                var dateText = new Date(getTime(data.createAt))
                let dateToShow;
                const showTime = () => {
        
                    var nowDate = new Date(getTime())
                    var diffMs = (nowDate - dateText);
                    var diffDays = Math.floor(diffMs / 86400000); // days
                    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                    var diffSecs = Math.round((nowDate - dateText)) / 1000
        
                    if(diffSecs >= 0 && diffMins == 0)
                    {
                        dateToShow = 'now'
                    }
                    else if(diffMins >= 1 && diffHrs == 0)
                    {
                        dateToShow = diffMins + 'm'
                    }
                    else if(diffHrs >= 1 && diffDays == 0)
                    {
                        dateToShow = diffHrs + 'h'
                    }
                    else if(diffHrs > 24)
                    {
                        dateToShow = diffDays + 'd'
                    }

                    $(`#lasttimeReceiver-${data.friendId}`).text(dateToShow)
                };
                const timer = setInterval(() => {showTime()},60000);
            };
            

            if (data.message.length > 24) 
            {
                var truncate = data.message.substring(0, 24) + '...';
                
                    timeCounter()
                    $('.list-friend').prepend(`
                        <a  class="border-bt" name ="${trueName}" id ="${trueId}" onclick="checkUserClicked(this);">
                                <div id ="friend" class="friend">
                                    <div class="new-message"></div>
                                    <div class="friend-infor">
                                        <img class="img-list" src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                        <div class="name-friend">
                                            <div class="name-friend__infor">
                                                <span class="friend__fullname">${trueName}</span>
                                                <span data-id ="${trueId}" id = "friend__id-${trueId}" value = "${trueId}" class="friend__id">${trueId}</span>
                                            </div>
                                            <div class="name-friend__minute">
                                                <span class = "${data.createAt}" id ="lasttimeReceiver-${trueId}" >${time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-message">
                                        <span style="font-weight:normal;color:" name = "${trueId}" id="content-messag_detail-${trueId}" class="content-messag_detail">${truncate}</span>
                                    </div>
                                </div>
                            </a>  
                        `).fadeIn("slow")
                    timeCounter()
            }
            else
            {

                    timeCounter()
                    $('.list-friend').prepend(`
                        <a  class="border-bt" name ="${trueName}" id ="${trueId}" onclick="checkUserClicked(this);">
                                <div id ="friend" class="friend">
                                    <div class="new-message"></div>
                                    <div class="friend-infor">
                                        <img class="img-list" src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                        <div class="name-friend">
                                            <div class="name-friend__infor">
                                                <span class="friend__fullname">${trueName}</span>
                                                <span data-id ="${trueId}" id = "friend__id-${trueId}" value = "${trueId}" class="friend__id">${trueId}</span>
                                            </div>
                                            <div class="name-friend__minute">
                                                <span class = "${data.createAt}" id ="lasttimeReceiver-${trueId}" >${time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-message">
                                        <span style="font-weight:normal;color:''" name = "${trueId}" id="content-messag_detail-${trueId}" class="content-messag_detail">${data.message}</span>
                                    </div>
                                </div>
                            </a>   
                    `).fadeIn("slow")
                    timeCounter()
            }

            // console.log(trueId)
            // console.log(trueName)
        }
        else
        {

            if(friendRawDate)
            {
                var time = ''
                var dateText = new Date(getTime(parseInt(friend[i].rawDate)))
                var nowDate = new Date(getTime())
                var diffMs = (nowDate - dateText);
                var diffDays = Math.floor(diffMs / 86400000); // days
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                var diffSecs = Math.round((nowDate - dateText)) / 1000
                
                if(diffSecs >= 0 && diffMins == 0)
                {
                    time = 'now'
                }
                else if(diffMins >= 1 && diffHrs == 0)
                {
                    time = diffMins + 'm'
                }
                else if(diffHrs >= 1 && diffDays == 0)
                {
                    time = diffHrs + 'ho'
                }
                else if(diffHrs > 24)
                {
                    time = diffDays + 'd'
                }
            
                const timeCounter = () => {
                    var dateText = new Date(getTime(parseInt(friend[i].rawDate)))
                    let dateToShow;
                    const showTime = () => {
            
                        var nowDate = new Date(getTime())
                        var diffMs = (nowDate - dateText);
                        var diffDays = Math.floor(diffMs / 86400000); // days
                        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                        var diffSecs = Math.round((nowDate - dateText)) / 1000
            
                        if(diffSecs >= 0 && diffMins == 0)
                        {
                            dateToShow = 'now'
                        }
                        else if(diffMins >= 1 && diffHrs == 0)
                        {
                            dateToShow = diffMins + 'm'
                        }
                        else if(diffHrs >= 1 && diffDays == 0)
                        {
                            dateToShow = diffHrs + 'h'
                        }
                        else if(diffHrs > 24)
                        {
                            dateToShow = diffDays + 'd'
                        }

                        $(`#lasttimeReceiver-${trueId}`).text(dateToShow)
                    };
            
                    const timer = setInterval(() => {showTime()},60000);
                };

                if (data.message.length > 24) 
                {
                        timeCounter()
                        $('.list-friend').append(`
                            <a  class="border-bt" name ="${trueName}" id ="${trueId}" onclick="checkUserClicked(this);">
                                    <div id ="friend" class="friend">
                                        <div class="new-message"></div>
                                        <div class="friend-infor">
                                            <img class="img-list" src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                            <div class="name-friend">
                                                <div class="name-friend__infor">
                                                    <span class="friend__fullname">${trueName}</span>
                                                    <span data-id ="${trueId}" id = "friend__id-${trueId}" value = "${trueId}" class="friend__id">${trueId}</span>
                                                </div>
                                                <div class="name-friend__minute">
                                                    <span class = "${friendRawDate}" id ="lasttimeReceiver-${trueId}" >${time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-message">
                                            <span style="font-weight:${friend[i].fontweight};color:${friend[i].color}" name = "${trueId}" id="content-messag_detail-${trueId}" class="content-messag_detail">${truncate}</span>
                                        </div>
                                    </div>
                                </a>  
                            `
                        )
                        timeCounter()
                }
                else
                {
                        timeCounter()
                        $('.list-friend').append(`
                            <a  class="border-bt" name ="${trueName}" id ="${trueId}" onclick="checkUserClicked(this);">
                                    <div id ="friend" class="friend">
                                        <div class="new-message"></div>
                                        <div class="friend-infor">
                                            <img class="img-list" src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                            <div class="name-friend">
                                                <div class="name-friend__infor">
                                                    <span class="friend__fullname">${trueName}</span>
                                                    <span data-id ="${trueId.toString()}" id = "friend__id-${trueId}" value = "${trueId}" class="friend__id">${trueId}</span>
                                                </div>
                                                <div class="name-friend__minute">
                                                    <span class = "${friendRawDate}" id ="lasttimeReceiver-${trueId}" >${time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-message">
                                            <span style="font-weight:${friend[i].fontweight};color:${friend[i].color}" name = "${trueId}" id="content-messag_detail-${trueId}" class="content-messag_detail">${friendMesage}</span>
                                        </div>
                                    </div>
                                </a>  
                            `
                        )
                        timeCounter()
                }
            }
            else
            {
                var time = ''
                var dateText = new Date(getTime(parseInt(friend[i].rawDate)))
                var nowDate = new Date(getTime())
                var diffMs = (nowDate - dateText);
                var diffDays = Math.floor(diffMs / 86400000); // days
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                var diffSecs = Math.round((nowDate - dateText)) / 1000
                
                if(diffSecs >= 0 && diffMins == 0)
                {
                    time = 'now'
                }
                else if(diffMins >= 1 && diffHrs == 0)
                {
                    time = diffMins + 'm'
                }
                else if(diffHrs >= 1 && diffDays == 0)
                {
                    time = diffHrs + 'ho'
                }
                else if(diffHrs > 24)
                {
                    time = diffDays + 'd'
                }
            
                const timeCounter = () => {
                    var dateText = new Date(getTime(parseInt(friend[i].rawDate)))
                    let dateToShow;
                    const showTime = () => {
            
                        var nowDate = new Date(getTime())
                        var diffMs = (nowDate - dateText);
                        var diffDays = Math.floor(diffMs / 86400000); // days
                        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                        var diffSecs = Math.round((nowDate - dateText)) / 1000
            
                        if(diffSecs >= 0 && diffMins == 0)
                        {
                            dateToShow = 'now'
                        }
                        else if(diffMins >= 1 && diffHrs == 0)
                        {
                            dateToShow = diffMins + 'm'
                        }
                        else if(diffHrs >= 1 && diffDays == 0)
                        {
                            dateToShow = diffHrs + 'h'
                        }
                        else if(diffHrs > 24)
                        {
                            dateToShow = diffDays + 'd'
                        }

                        $(`#lasttimeReceiver-${trueId}`).text(dateToShow)
                    };
            
                    const timer = setInterval(() => {showTime()},60000);
                };

                if (data.message.length > 24) 
                {
                        timeCounter()
                        $('.list-friend').append(`
                            <a  class="border-bt" name ="${trueName}" id ="${trueId}" onclick="checkUserClicked(this);">
                                    <div id ="friend" class="friend">
                                        <div class="new-message"></div>
                                        <div class="friend-infor">
                                            <img class="img-list" src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                            <div class="name-friend">
                                                <div class="name-friend__infor">
                                                    <span class="friend__fullname">${trueName}</span>
                                                    <span data-id ="${trueId}" id = "friend__id-${trueId}" value = "${trueId}" class="friend__id">${trueId}</span>
                                                </div>
                                                <div class="name-friend__minute">
                                                    <span class = "${friendRawDate}" id ="lasttimeReceiver-${trueId}" ></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-message">
                                            <span style="font-weight:${friend[i].fontweight};color:${friend[i].color}" name = "${trueId}" id="content-messag_detail-${trueId}" class="content-messag_detail">${truncate}</span>
                                        </div>
                                    </div>
                                </a>  
                            `
                        )
                        timeCounter()
                }
                else
                {
                        timeCounter()
                        $('.list-friend').append(`
                            <a  class="border-bt" name ="${trueName}" id ="${trueId}" onclick="checkUserClicked(this);">
                                    <div id ="friend" class="friend">
                                        <div class="new-message"></div>
                                        <div class="friend-infor">
                                            <img class="img-list" src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                            <div class="name-friend">
                                                <div class="name-friend__infor">
                                                    <span class="friend__fullname">${trueName}</span>
                                                    <span data-id ="${trueId.toString()}" id = "friend__id-${trueId}" value = "${trueId}" class="friend__id">${trueId}</span>
                                                </div>
                                                <div class="name-friend__minute">
                                                    <span class = "${friendRawDate}" id ="lasttimeReceiver-${trueId}" ></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-message">
                                            <span style="font-weight:${friend[i].fontweight};color:${friend[i].color}" name = "${trueId}" id="content-messag_detail-${trueId}" class="content-messag_detail">${friendMesage}</span>
                                        </div>
                                    </div>
                                </a>  
                            `
                        )
                        timeCounter()
                }
            }
        }
    }
})

socket.on('receive-last-message-receiver',data =>{
    
    console.log("data 2",data)

    var slides = document.getElementsByClassName("border-bt");
    var friend = []
    for (var i = 0; i < slides.length; i++) {
        friend.push({
            friendId: slides[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[3].innerHTML,
            friendName: slides[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[1].innerHTML,
            rawDate:slides[i].childNodes[1].childNodes[3].childNodes[3].childNodes[3].childNodes[1].className,
            text:document.getElementById(`content-messag_detail-${slides[i].id}`).innerHTML,
            fontweight:slides[i].childNodes[1].childNodes[5].childNodes[1].style.fontWeight,
            color:slides[i].childNodes[1].childNodes[5].childNodes[1].style.color
        })
    }

    var trueIdReceiver =  document.getElementById(`infordetail-id-${parseInt(data.friendId)}`)
    console.log(trueIdReceiver)
    if(trueIdReceiver !== null)
    {
        $('.list-friend').empty()

        var slides = document.getElementsByClassName("border-bt");
        for (var i = 0; i < friend.length; i++) {
    
            if(parseInt(trueIdReceiver.innerHTML) == data.friendId)
            {
                var trueId = friend[i].friendId
                var trueName= friend[i].friendName
                var friendMesage=friend[i].text
                var friendRawDate = friend[i].rawDate
    
                if(parseInt(trueId) == data.myId)
                {
                    var time = ''
                    var dateText = new Date(getTime(data.createAt))
                    var nowDate = new Date(getTime())
                    var diffMs = (nowDate - dateText);
                    var diffDays = Math.floor(diffMs / 86400000); // days
                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                    var diffSecs = Math.round((nowDate - dateText)) / 1000
                    
                    if(diffSecs >= 0 && diffMins == 0)
                    {
                        time = 'now'
                    }
                    else if(diffMins >= 1 && diffHrs == 0)
                    {
                        time = diffMins + 'm'
                    }
                    else if(diffHrs >= 1 && diffDays == 0)
                    {
                        time = diffHrs + 'ho'
                    }
                    else if(diffHrs > 24)
                    {
                        time = diffDays + 'd'
                    }
                
                    const timeCounter = () => {
                        var dateText = new Date(getTime(data.createAt))
                        let dateToShow;
                        const showTime = () => {
                
                            var nowDate = new Date(getTime())
                            var diffMs = (nowDate - dateText);
                            var diffDays = Math.floor(diffMs / 86400000); // days
                            var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                            var diffSecs = Math.round((nowDate - dateText)) / 1000
                
                            if(diffSecs >= 0 && diffMins == 0)
                            {
                                dateToShow = 'now'
                            }
                            else if(diffMins >= 1 && diffHrs == 0)
                            {
                                dateToShow = diffMins + 'm'
                            }
                            else if(diffHrs >= 1 && diffDays == 0)
                            {
                                dateToShow = diffHrs + 'h'
                            }
                            else if(diffHrs > 24)
                            {
                                dateToShow = diffDays + 'd'
                            }
    
                            $(`#lasttimeReceiver-${data.friendId}`).text(dateToShow)
                        };
                        const timer = setInterval(() => {showTime()},60000);
                    };
                    
    
                    if (data.message.length > 24) 
                    {
                        var truncate = data.message.substring(0, 24) + '...';
                        
                            timeCounter()
                            $('.list-friend').prepend(`
                                <a  class="border-bt" name ="${trueName}" id ="${trueId}" onclick="checkUserClicked(this);">
                                        <div id ="friend" class="friend">
                                            <div class="new-message"></div>
                                            <div class="friend-infor">
                                                <img class="img-list" src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                                <div class="name-friend">
                                                    <div class="name-friend__infor">
                                                        <span class="friend__fullname">${trueName}</span>
                                                        <span data-id ="${trueId}" id = "friend__id-${trueId}" value = "${trueId}" class="friend__id">${trueId}</span>
                                                    </div>
                                                    <div class="name-friend__minute">
                                                        <span class = "${data.createAt}" id ="lasttimeReceiver-${trueId}">${time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-message">
                                                <span style="font-weight:bold;color:black" name = "${trueId}" id="content-messag_detail-${trueId}" class="content-messag_detail">${truncate}</span>
                                            </div>
                                        </div>
                                    </a>  
                                `).fadeIn("slow")
                            timeCounter()
                    }
                    else
                    {
    
                            timeCounter()
                            $('.list-friend').prepend(`
                                <a  class="border-bt" name ="${trueName}" id ="${trueId}" onclick="checkUserClicked(this);">
                                        <div id ="friend" class="friend">
                                            <div class="new-message"></div>
                                            <div class="friend-infor">
                                                <img class="img-list" src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                                <div class="name-friend">
                                                    <div class="name-friend__infor">
                                                        <span class="friend__fullname">${trueName}</span>
                                                        <span data-id ="${trueId}" id = "friend__id-${trueId}" value = "${trueId}" class="friend__id">${trueId}</span>
                                                    </div>
                                                    <div class="name-friend__minute">
                                                        <span class = "${data.createAt}" id ="lasttimeReceiver-${trueId}">${time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-message">
                                                <span style="font-weight:bold;color:black" name = "${trueId}" id="content-messag_detail-${trueId}" class="content-messag_detail">${data.message}</span>
                                            </div>
                                        </div>
                                    </a>   
                            `).fadeIn("slow")
                            timeCounter()
                    }
    
                    // console.log(trueId)
                    // console.log(trueName)
                }
                else
                {
                    if(friendRawDate)
                    {
                        var time = ''
                        var dateText = new Date(getTime(parseInt(friend[i].rawDate)))
                        var nowDate = new Date(getTime())
                        var diffMs = (nowDate - dateText);
                        var diffDays = Math.floor(diffMs / 86400000); // days
                        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                        var diffSecs = Math.round((nowDate - dateText)) / 1000
                        
                        if(diffSecs >= 0 && diffMins == 0)
                        {
                            time = 'now'
                        }
                        else if(diffMins >= 1 && diffHrs == 0)
                        {
                            time = diffMins + 'm'
                        }
                        else if(diffHrs >= 1 && diffDays == 0)
                        {
                            time = diffHrs + 'ho'
                        }
                        else if(diffHrs > 24)
                        {
                            time = diffDays + 'd'
                        }
                    
                        const timeCounter = () => {
                            var dateText = new Date(getTime(parseInt(friend[i].rawDate)))
                            let dateToShow;
                            const showTime = () => {
                    
                                var nowDate = new Date(getTime())
                                var diffMs = (nowDate - dateText);
                                var diffDays = Math.floor(diffMs / 86400000); // days
                                var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                                var diffSecs = Math.round((nowDate - dateText)) / 1000
                    
                                if(diffSecs >= 0 && diffMins == 0)
                                {
                                    dateToShow = 'now'
                                }
                                else if(diffMins >= 1 && diffHrs == 0)
                                {
                                    dateToShow = diffMins + 'm'
                                }
                                else if(diffHrs >= 1 && diffDays == 0)
                                {
                                    dateToShow = diffHrs + 'h'
                                }
                                else if(diffHrs > 24)
                                {
                                    dateToShow = diffDays + 'd'
                                }

                                $(`#lasttimeReceiver-${trueId}`).text(dateToShow)
                            };
                    
                            const timer = setInterval(() => {showTime()},60000);
                        };

                        if (data.message.length > 24) 
                        {
                                timeCounter()
                                $('.list-friend').append(`
                                    <a  class="border-bt" name ="${trueName}" id ="${trueId}" onclick="checkUserClicked(this);">
                                            <div id ="friend" class="friend">
                                                <div class="new-message"></div>
                                                <div class="friend-infor">
                                                    <img class="img-list" src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                                    <div class="name-friend">
                                                        <div class="name-friend__infor">
                                                            <span class="friend__fullname">${trueName}</span>
                                                            <span data-id ="${trueId}" id = "friend__id-${trueId}" value = "${trueId}" class="friend__id">${trueId}</span>
                                                        </div>
                                                        <div class="name-friend__minute">
                                                            <span class = "${friendRawDate}" id ="lasttimeReceiver-${trueId}" >${time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="content-message">
                                                    <span style="font-weight:${friend[i].fontweight};color:${friend[i].color}" name = "${trueId}" id="content-messag_detail-${trueId}" class="content-messag_detail">${truncate}</span>
                                                </div>
                                            </div>
                                        </a>  
                                    `
                                )
                                timeCounter()
                        }
                        else
                        {
                                timeCounter()
                                $('.list-friend').append(`
                                    <a  class="border-bt" name ="${trueName}" id ="${trueId}" onclick="checkUserClicked(this);">
                                            <div id ="friend" class="friend">
                                                <div class="new-message"></div>
                                                <div class="friend-infor">
                                                    <img class="img-list" src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                                    <div class="name-friend">
                                                        <div class="name-friend__infor">
                                                            <span class="friend__fullname">${trueName}</span>
                                                            <span data-id ="${trueId.toString()}" id = "friend__id-${trueId}" value = "${trueId}" class="friend__id">${trueId}</span>
                                                        </div>
                                                        <div class="name-friend__minute">
                                                            <span class = "${friendRawDate}" id ="lasttimeReceiver-${trueId}" >${time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="content-message">
                                                    <span style="font-weight:${friend[i].fontweight};color:${friend[i].color}" name = "${trueId}" id="content-messag_detail-${trueId}" class="content-messag_detail">${friendMesage}</span>
                                                </div>
                                            </div>
                                        </a>  
                                    `
                                )
                                timeCounter()
                        }
                    }
                    else
                    {
                        var time = ''
                        var dateText = new Date(getTime(parseInt(friend[i].rawDate)))
                        var nowDate = new Date(getTime())
                        var diffMs = (nowDate - dateText);
                        var diffDays = Math.floor(diffMs / 86400000); // days
                        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                        var diffSecs = Math.round((nowDate - dateText)) / 1000
                        
                        if(diffSecs >= 0 && diffMins == 0)
                        {
                            time = 'now'
                        }
                        else if(diffMins >= 1 && diffHrs == 0)
                        {
                            time = diffMins + 'm'
                        }
                        else if(diffHrs >= 1 && diffDays == 0)
                        {
                            time = diffHrs + 'ho'
                        }
                        else if(diffHrs > 24)
                        {
                            time = diffDays + 'd'
                        }
                    
                        const timeCounter = () => {
                            var dateText = new Date(getTime(parseInt(friend[i].rawDate)))
                            let dateToShow;
                            const showTime = () => {
                    
                                var nowDate = new Date(getTime())
                                var diffMs = (nowDate - dateText);
                                var diffDays = Math.floor(diffMs / 86400000); // days
                                var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                                var diffSecs = Math.round((nowDate - dateText)) / 1000
                    
                                if(diffSecs >= 0 && diffMins == 0)
                                {
                                    dateToShow = 'now'
                                }
                                else if(diffMins >= 1 && diffHrs == 0)
                                {
                                    dateToShow = diffMins + 'm'
                                }
                                else if(diffHrs >= 1 && diffDays == 0)
                                {
                                    dateToShow = diffHrs + 'h'
                                }
                                else if(diffHrs > 24)
                                {
                                    dateToShow = diffDays + 'd'
                                }

                                $(`#lasttimeReceiver-${trueId}`).text(dateToShow)
                            };
                    
                            const timer = setInterval(() => {showTime()},60000);
                        };

                        if (data.message.length > 24) 
                        {
                                timeCounter()
                                $('.list-friend').append(`
                                    <a  class="border-bt" name ="${trueName}" id ="${trueId}" onclick="checkUserClicked(this);">
                                            <div id ="friend" class="friend">
                                                <div class="new-message"></div>
                                                <div class="friend-infor">
                                                    <img class="img-list" src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                                    <div class="name-friend">
                                                        <div class="name-friend__infor">
                                                            <span class="friend__fullname">${trueName}</span>
                                                            <span data-id ="${trueId}" id = "friend__id-${trueId}" value = "${trueId}" class="friend__id">${trueId}</span>
                                                        </div>
                                                        <div class="name-friend__minute">
                                                            <span class = "${friendRawDate}" id ="lasttimeReceiver-${trueId}" ></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="content-message">
                                                    <span style="font-weight:${friend[i].fontweight};color:${friend[i].color}" name = "${trueId}" id="content-messag_detail-${trueId}" class="content-messag_detail">${truncate}</span>
                                                </div>
                                            </div>
                                        </a>  
                                    `
                                )
                                timeCounter()
                        }
                        else
                        {
                                timeCounter()
                                $('.list-friend').append(`
                                    <a  class="border-bt" name ="${trueName}" id ="${trueId}" onclick="checkUserClicked(this);">
                                            <div id ="friend" class="friend">
                                                <div class="new-message"></div>
                                                <div class="friend-infor">
                                                    <img class="img-list" src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                                    <div class="name-friend">
                                                        <div class="name-friend__infor">
                                                            <span class="friend__fullname">${trueName}</span>
                                                            <span data-id ="${trueId.toString()}" id = "friend__id-${trueId}" value = "${trueId}" class="friend__id">${trueId}</span>
                                                        </div>
                                                        <div class="name-friend__minute">
                                                            <span class = "${friendRawDate}" id ="lasttimeReceiver-${trueId}" ></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="content-message">
                                                    <span style="font-weight:${friend[i].fontweight};color:${friend[i].color}" name = "${trueId}" id="content-messag_detail-${trueId}" class="content-messag_detail">${friendMesage}</span>
                                                </div>
                                            </div>
                                        </a>  
                                    `
                                )
                                timeCounter()
                        }
                    }
                }
            }
        }
    }
})

socket.on('receive-chat-message',data =>{

    console.log("data 3",data)
    var slides = document.getElementsByClassName("border-bt");
    var trueId = document.getElementById(`infordetail-id-${parseInt(data.friendId)}`)
    if(trueId !== null)
    {
        for (var i = 0; i < slides.length; i++) {
            if(slides[i].id == data.myId)
            {
                if(trueId.innerHTML == data.friendId)
                {
                    var time = ''
                    var dateText = new Date(getTime(data.createAt))
                    var nowDate = new Date(getTime())
                    var diffMs = (nowDate - dateText);
                    var diffDays = Math.floor(diffMs / 86400000); // days
                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                    var diffSecs = Math.round((nowDate - dateText)) / 1000
                    
                    if(diffSecs >= 0 && diffMins == 0)
                    {
                        time = 'Just now'
                    }
                    else if(diffMins >= 1 && diffHrs == 0)
                    {
                        time = diffMins + ' min'
                    }
                    else if(diffHrs >= 1 && diffDays == 0)
                    {
                        time = diffHrs + ' hours'
                    }
                    else if(diffHrs > 24)
                    {
                        time = diffDays + ' day'
                    }
                
                    const timeCounter = () => {
                        var dateText = new Date(getTime(data.createAt))
                        let dateToShow;
                        const showTime = () => {
                
                            var nowDate = new Date(getTime())
                            var diffMs = (nowDate - dateText);
                            var diffDays = Math.floor(diffMs / 86400000); // days
                            var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                            var diffSecs = Math.round((nowDate - dateText)) / 1000
                
                            if(diffSecs >= 0 && diffMins == 0)
                            {
                                dateToShow = 'Just now'
                            }
                            else if(diffMins >= 1 && diffHrs == 0)
                            {
                                dateToShow = diffMins + ' min'
                            }
                            else if(diffHrs >= 1 && diffDays == 0)
                            {
                                dateToShow = diffHrs + ' hours'
                            }
                            else if(diffHrs > 24)
                            {
                                dateToShow = diffDays + ' day'
                            }
                            if(data.friendId === $(`#timeText-${data.friendId}`).attr('name'))
                            {
                                $(`#timeText-${data.friendId}`).text(dateToShow)
                            }
                        };
                
                        const timer = setInterval(() => {showTime()},60000);
                    };
                        
                    timeCounter()
                    $('.send-message').append(`
                        <div id = "friend-message" class="friend-message">
                            <img class="img-heading"  src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                            <div class="content-friend-message">
                                <div class="message" style="position: relative;">
                                    <p id = "friendsendtext">${data.message}</p>
                                    <div class="message-content" style="position: absolute; top: 100%; right: 0; max-width: max-content; max-height: 200px; overflow: auto;">
                                        <ul class="options" style="padding: 0; margin: 0; list-style: none;">
                                            <li style="padding: 5px;">Xóa</li>
                                            <li style="padding: 5px;">Gỡ bỏ</li>
                                            <li style="padding: 5px;">Chuyển tiếp</li>
                                            <li style="padding: 5px;">Ghim</li>
                                        </ul>
                                    </div>
                                </div>
                                <p name = "${data.friendId}" id = "timeText-${data.friendId}" class="content-message__minute">${time}</p>
                            </div>
                        </div>
                    `)
                    const element = $(`#sendmessage`);
                        element.animate({
                        scrollTop: element.prop("scrollHeight")
                    }, 1000);
                }
            }
        }
    }
})

var fullname = $('.infordetail-name').html()

$('.content-main__message-name').hide()
$('.send-message').hide()
$('.input-message').hide()


const element = $(`#sendmessage`);
    element.animate({
    scrollTop: element.prop("scrollHeight")
}, 0);

function checkUserClicked(ele) {

    var friendId = $(ele).attr("id");
    var friendName = $(ele).attr("name");

    $('.content-main__message-name').show()
    $('.send-message').show()

    $('.input-message').show()
    $('.content-message__friend').show()
    $('.content-message__friend').attr('id',friendId);
    $('#friendName').html(friendName)
    $('#friendId').html(friendId)

    var myid = $('.infordetail-id').html()

    $('#sendtext').attr('disabled', 'disabled');
    $('input[id=mytext]').on('keyup', function() {
        let empty = false;
        if ($(this).val().length == 0) {
            empty = true;
        }
        if (empty)
            $('#sendtext').attr('disabled', 'disabled');
          
        else
            $('#sendtext').attr('disabled', false);
    });
    
    $.get("/api", function(data){

        $('.my-message').remove()
        $('.friend-message').remove()

        // console.log(data)
        var result = []
        result.push(data)
        if(result.length)
        {
            var lasttext = []
            var a = Array.from(data.text).find(e =>{ 
                lasttext.push(e)
                if(friendId == e.sender)
                {
                    var text = document.getElementById(`content-messag_detail-${e.sender}`);
                    text.style.fontWeight = 'normal'
                    text.style.color = ''

                    // var lastReceiver = lasttext[lasttext.length - 1].receiver
                    // var lastSender = lasttext[lasttext.length - 1].sender

                    // console.log('lastReceiver',lastReceiver)
                    // console.log('lastSender',lastSender)
                    // console.log('lastSender'.lasttext[lasttext.length - 1].message)
                    
                    // if(lastSender === friendId)
                    // {
                    //     if(lastReceiver === myid)
                    //     {   
                    //         console.log('true')
                    //         socket.emit('checked-chat-message', lasttext.slice(-1).pop()) 
                    //     }
                    // }
                }
            })
            var arr = []

            for (var key in lasttext) {

                if(lasttext[key].sender === friendId)
                {
                    if(lasttext[key].receiver === myid)
                    {   
                        arr.push(lasttext[key])
                    }
                }
            }

            var lastFriendMessage = arr.length;

            for (item of arr)
            {
                if (!--lastFriendMessage)
                    socket.emit('checked-chat-message', item) 
            }
            // for (item of lasttext)
            // {
            //     Object.fromEntries(item).(e =>{
            //         console.log(e)
            //     })
            //     // if(item[0].sender === friendId)
            //     // {
            //     //     if(item[0].receiver === myid)
            //     //     {   
            //     //         if (!--lastFriendMessage)
            //     //         {
            //     //             console.log(item)
            //     //             console.log('true')
            //     //             socket.emit('checked-chat-message', lasttext.slice(-1).pop()) 
            //     //         }
            //     //     }
            //     // }
            // }
            
            data.text.map(e =>{
                var time = ''
                var dateText = new Date(getTime(e.createAt))
                var nowDate = new Date(getTime())
                var diffMs = (nowDate - dateText);
                var diffDays = Math.floor(diffMs / 86400000); // days
                var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                var diffSecs = Math.round((nowDate - dateText)) / 1000
    
                if(diffSecs >= 0 && diffMins == 0)
                {
                    time = 'Just now'
                }
                else if(diffMins >= 1 && diffHrs == 0)
                {
                    time = diffMins + ' min'
                }
                else if(diffHrs >= 1 && diffDays == 0)
                {
                    time = diffHrs + ' hours'
                }
                else if(diffHrs > 24)
                {
                    time = diffDays + ' day'
                }
    
                const timeCounter = () => {
                    var dateText = new Date(getTime(e.createAt))
                    let dateToShow;
                    const showTime = () => {
    
                        var nowDate = new Date(getTime())
                        var diffMs = (nowDate - dateText);
                        var diffDays = Math.floor(diffMs / 86400000); // days
                        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                        var diffSecs = Math.round((nowDate - dateText)) / 1000
    
                        if(diffSecs >= 0 && diffMins == 0)
                        {
                            dateToShow = 'Just now'
                        }
                        else if(diffMins >= 1 && diffHrs == 0)
                        {
                            dateToShow = diffMins + ' min'
                        }
                        else if(diffHrs >= 1 && diffDays == 0)
                        {
                            dateToShow = diffHrs + ' hours'
                        }
                        else if(diffHrs > 24)
                        {
                            dateToShow = diffDays + ' day'
                        }
                        if(e.id === $(`#timeText-${e.id}`).attr('name'))
                        {
                            $(`#timeText-${e.id}`).text(dateToShow)
                        }
                    };
    
                    const timer = setInterval(() => {showTime()},60000);
    
                  };
                      
                if(e.receiver === friendId)
                {
                    if(e.sender === myid)
                    {   
                        timeCounter()
                        $('#mytext').attr('class', `text-${friendId}`);
                        $('#sendtext').attr('name', `button-${friendId}`);
                        $('.send-message').append(`
                            <div class="my-message">
                                <img class="img-heading"  src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                <div class="content-my-message">
                                    <div class="message" style="position: relative;">
                                    <p id = "mysendtext">${e.message}</p>
                                    <div class="message-content" style="position: absolute; top: 100%; right: 0; max-width: max-content; max-height: 200px; overflow: auto;">
                                        <ul class="options" style="padding: 0; margin: 0; list-style: none;">
                                            <li style="padding: 5px;">Xóa</li>
                                            <li style="padding: 5px;">Gỡ bỏ</li>
                                            <li style="padding: 5px;">Chuyển tiếp</li>
                                            <li style="padding: 5px;">Ghim</li>
                                        </ul>
                                    </div>
                                    </div>
                                    <p id = "timeText-${e.id}" name = "${e.id}" class="content-message__minute">${time}</p>
                                </div>
                            </div>
                        `);
                        timeCounter()
                    }
                }
                if(e.sender === friendId)
                {
                    $('#mytext').attr('class', `text-${friendId}`);
                    $('#sendtext').attr('name', `button-${friendId}`);
                    if(e.receiver === myid)
                    {
                        timeCounter()
                        $('.send-message').append(`
                            <div id = "friend-message" class="friend-message">
                                <img class="img-heading"  src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                <div class="content-friend-message">
                                    <div class="message" style="position: relative;">
                                    <p id = "friendsendtext">${e.message}</p>
                                    <div class="message-content" style="position: absolute; top: 100%; right: 0; max-width: max-content; max-height: 200px; overflow: auto;">
                                        <ul class="options" style="padding: 0; margin: 0; list-style: none;">
                                            <li style="padding: 5px;">Xóa</li>
                                            <li style="padding: 5px;">Chuyển tiếp</li>
                                            <li style="padding: 5px;">Ghim</li>
                                        </ul>
                                    </div>
                                    </div>
                                    <p id = "timeText-${e.id}"  name = "${e.id}" class="content-message__minute">${time}</p>
                                </div>
                            </div>
                        `)
                        timeCounter()
                    }
                    if(e.sender === myid)
                    {
                        timeCounter()
                        $('#mytext').attr('class', `text-${friendId}`);
                        $('#sendtext').attr('name', `button-${friendId}`);
                        $('.send-message').append(`
                            <div class="my-message">
                                <img class="img-heading"  src="https://i.pinimg.com/originals/ce/12/25/ce1225f92e766b3a87113dc69560e88f.jpg" alt="">
                                <div class="content-my-message">
                                <div class="message" style="position: relative;">
                                    <p id = "mysendtext">${e.message}</p>
                                    <div class="message-content" style="position: absolute; top: 100%; right: 0; max-width: max-content; max-height: 200px; overflow: auto;">
                                        <ul class="options" style="padding: 0; margin: 0; list-style: none;">
                                            <li style="padding: 5px;">Xóa</li>
                                            <li style="padding: 5px;">Gỡ bỏ</li>
                                            <li style="padding: 5px;">Chuyển tiếp</li>
                                            <li style="padding: 5px;">Ghim</li>
                                        </ul>
                                    </div>
                                    </div>
                                    <p id = "timeText-${e.id}" name = "${e.id}" class="content-message__minute">${time}</p>
                                </div>
                            </div>
                        `);
                        timeCounter()
                    }
                }
            });
    
            const element = $(`#sendmessage`);
            element.animate({
            scrollTop: element.prop("scrollHeight")
            }, 0);
        }

        // console.log(lasttext.slice(-1).pop())
        // socket.emit('checked-chat-message', lasttext.slice(-1).pop()) 
    })

    return true
}

function getTime(date)
{
    if(date)
    {
        var today = new Date(date);
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        return date + ' '+ time
    }
    else
    {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        return date + ' '+ time
    }
}


setInterval(function(){
    var slides = document.getElementsByClassName("border-bt");
    var friend = []
    for (var i = 0; i < slides.length; i++) {
        friend.push({
            friendId: slides[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[3].innerHTML,
            rawDate:slides[i].childNodes[1].childNodes[3].childNodes[3].childNodes[3].childNodes[1].className,
        })
    }

    var slides = document.getElementsByClassName("border-bt");
    for (var i = 0; i < friend.length; i++) {

        var trueId = friend[i].friendId

        if(friend[i].rawDate)
        {
            var time = ''
            var dateText = new Date(getTime(parseInt(friend[i].rawDate)))
            var nowDate = new Date(getTime())
            var diffMs = (nowDate - dateText);
            var diffDays = Math.floor(diffMs / 86400000); // days
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
            var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
            var diffSecs = Math.round((nowDate - dateText)) / 1000
            
            if(diffSecs >= 0 && diffMins == 0)
            {
                time = 'now'
            }
            else if(diffMins >= 1 && diffHrs == 0)
            {
                time = diffMins + 'm'
            }
            else if(diffHrs >= 1 && diffDays == 0)
            {
                time = diffHrs + 'ho'
            }
            else if(diffHrs > 24)
            {
                time = diffDays + 'd'
            }
        
            $(`#lasttimeReceiver-${trueId}`).text(time)
        }
    }
},60000)