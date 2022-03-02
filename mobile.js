//adding spinner
const loading = (progress) => {
    document.getElementById("spinner").style.display = progress;
}
// start js
// load phone data
const loadData = () => {
    const input = document.getElementById("inputField");
    const errorMsg = document.getElementById("error_msg");
    const inputValue = input.value;
    //clear input
    input.value = "";
    //error handling
    if (inputValue === "" || !isNaN(inputValue)) {
        errorMsg.innerText = "! Please search by phone name";
    }
    else {
        //fetch phone data
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data.slice(0, 20)))
        errorMsg.innerText = "";
        loading("block");
    }
}

// display phone data
const displayPhone = (phones) => {
    const showPhone = document.getElementById("display_phone");
    const seeDetails = document.getElementById("showAll");
    const errorMsg = document.getElementById("error_msg");
    showPhone.textContent = "";
    //error handling
    if (phones.length === 0) {
        errorMsg.innerText = "! Please input valid phone name"
        loading("none");
    }
    else {
        phones.forEach(phone => {
            const div = document.createElement("div");
            div.classList.add("phone_items");
            div.innerHTML = `
    <div class="row card-phn px-2" >
      <div class="col-sm-12 ">
       <div class="card ">
        <div class="card-body card-size">
        <img class="phone-img" src="${phone.image}">
        <h3>Name : ${phone.phone_name} </h3> 
        <h3>Brand : ${phone.brand}</h3>
        <button class="btn btn-outline-dark" onclick="phoneDetails('${phone.slug}')" >More-Info</button>
    
        </div>
       </div>
      </div>
  
   </div>
        `
            showPhone.appendChild(div);
        });
        loading("none");
        // seeDetails.style.display = "block";
    }
}

// load phone details
const phoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayInfo(data.data))
    loading("block")
}
// display phone details
const displayInfo = (explore) => {
    const more_info = document.getElementById("display_info");
    more_info.textContent = "";
    const div = document.createElement("div");
    div.classList.add("infos");
    div.innerHTML = `
 
        <div class="row card-phn">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
      <img src="${explore.image}">
      <h3>Name : </h3>${explore.name}
      <h3>Release Date : </h3>${explore.releaseDate ? explore.releaseDate : "Not Found"}
     <h3>Features :</h3><p>ChipSet : ${explore.mainFeatures.chipSet}</p>
                            <p>DisplaySize : ${explore.mainFeatures.displaySize}</p> 
                            <p>Memory : ${explore.mainFeatures.memory}</p> 
             <h3>Sensors :</h3>${explore.mainFeatures.sensors}
             <h3>Others :</h3> 
             <p>Bluetooth : ${explore?.others?.Bluetooth ? explore.others?.Bluetooth : "Not Available"}</p>
             <p>GPS : ${explore?.others?.GPS ? explore?.others?.GPS : "Not Available"}</p>
             <p>NFC : ${explore?.others?.NFC ? explore?.others?.NFC : "Not Available"}</p>
             <p>Radio : ${explore?.others?.Radio ? explore?.others?.Radio : "Not Available"}</p>
             <p>USB : ${explore?.others?.USB ? explore?.others?.USB : "Not Available"}</p>
             <p>WLAN : ${explore?.others?.WLAN ? explore?.others?.WLAN : "Not Available"}</p>
     
      </div>
    </div>
  </div>
  
</div>
        
 `
    more_info.appendChild(div);
    loading("none");
}