function ManageIndexHtml () {

    this.mainSetup = () =>{
        this.manageUserInfo();
        this.manageLogout();
        this.manageHelp();
        this.loadUserLinks();
        this.manageDefaulterStatus();
        this.pageLoad('runningauction');
        // this.pageLoad('usermnage');
        
    } 

    // Manage Render UserInfo 
    this.manageUserInfo = () =>{
      this.userName = document.querySelector('.userName');
      this.commodityName = document.querySelector('.commodity-name');
      this.userName.textContent = localStorage.getItem('usr.nm');
      this.commodityName.textContent = localStorage.getItem('comodityName');
    }
    // End Render User Info


    // Manage Render User Links
    this.loadUserLinks = async () =>{
        let screenData = await sendHttpRequest('eaucnmanage/getapps',new FormData());
        this.renderLinks(screenData.Record);
    }

    this.renderLinks = (linkData) =>{
        console.log(linkData);
        this.linkWrapper = document.querySelector('aside');
        if(linkData){
            linkData.forEach(data=>{
                var linkEls = new ElCreatore({
                    linkDiv:"div",
                    textWrapper:"div",
                    iconWrapper:"div"
                });

                linkEls.linkDiv.classList.add('link');
                linkEls.linkDiv.dataset.link = data.value;

                linkEls.linkDiv.addEventListener('click',this.pageLoad.bind('',data.value))

                linkEls.textWrapper.classList.add('text');
                linkEls.iconWrapper.classList.add('icon');


                linkEls.textWrapper.textContent = data.text;
                linkEls.iconWrapper.innerHTML = `<i class="fa-solid fa-${data.icon}"></i>`;

                ElAppend(linkEls.linkDiv,linkEls.textWrapper,linkEls.iconWrapper);
                ElAppend(this.linkWrapper,linkEls.linkDiv)
            })
        }

        
    }
    // End Manage Render User Link

    this.manageLogout  = () =>{
        this.logOutBtn = document.querySelector('.logout-btn');
        this.logOutBtn.addEventListener('click',()=>{
            localStorage.clear();
            window.location.reload()
        });
    }

    this.manageHelp = () =>{
        this.helpBtn = document.querySelector('.help-btn');
        this.helpModal   = new Modal({
            selector:'#help',
            wrapperCss:"width:30%;border-radius:5px;margin-top:150px",
        });

        this.helpBtn.addEventListener('click',this.helpModal.showModal)
    }

    this.pageLoad = (pagename) => $("#main").load(`pages/${pagename}.html`);
    

    this.manageDefaulterStatus = () =>{
        this.listModal = new Modal({
            selector:"#view-list-popup",
            wrapperCss:"width:50%;backcolor:red;",
        })
        this.viewListBtn = document.querySelector('.view-list');

        this.viewListBtn.addEventListener('click',()=>this.listModal.showModal());
    }

    this.mainSetup();
}

var manageIndexHtml = new ManageIndexHtml();