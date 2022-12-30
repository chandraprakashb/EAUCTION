function ManageIndexHtml () {

    this.mainSetup = () =>{
        this.manageUserInfo();
        this.manageLogout();
        this.manageHelp();
        this.loadUserLinks();
        this.manageDefaulterStatus();
        this.pageLoad('uploadupset');
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
        // let screenData = await sendHttpRequest('eaucnmanage/getapps',new FormData());
        // this.renderLinks(screenData.Record);
        this.renderLinks([
            {
              "scid": 5,
              "value": "office",
              "text": "Office",
              "icon": "building-circle-check",
              "scSort": 1,
              "scUnder": 0
            },
            {
              "scid": 6,
              "value": "designation",
              "text": "Designation",
              "icon": "person-walking-luggage",
              "scSort": 0,
              "scUnder": 1
            },
            {
              "scid": 7,
              "value": "setting",
              "text": "Settings",
              "icon": "gear",
              "scSort": 0,
              "scUnder": 0
            },
            {
              "scid": 8,
              "value": "profile",
              "text": "Profile",
              "icon": "id-badge",
              "scSort": 0,
              "scUnder": 0
            },
            {
              "scid": 9,
              "value": "usermnage",
              "text": "Users",
              "icon": "users",
              "scSort": 0,
              "scUnder": 0
            },
            {
              "scid": 11,
              "value": "lotentry",
              "text": "Lot Entry",
              "icon": "file-lines",
              "scSort": 0,
              "scUnder": 0
            },
            {
              "scid": 12,
              "value": "lotfinalize",
              "text": "Lot Finalize",
              "icon": "check-to-slot",
              "scSort": 0,
              "scUnder": 0
            },
            {
              "scid": 13,
              "value": "bidder",
              "text": "Bidder",
              "icon": "user-tie",
              "scSort": 0,
              "scUnder": 0
            },
            {
              "scid": 14,
              "value": "createauction",
              "text": "Create Auction",
              "icon": "pen-to-square",
              "scSort": 1,
              "scUnder": 0
            },
            {
              "scid": 15,
              "value": "auctionapproved",
              "text": "Auction Approve",
              "icon": "thumbs-up",
              "scSort": 0,
              "scUnder": 0
            },
            {
              "scid": 16,
              "value": "uploadupset",
              "text": "Upload Upset",
              "icon": "arrow-up-from-bracket",
              "scSort": 0,
              "scUnder": 0
            }
          ])
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