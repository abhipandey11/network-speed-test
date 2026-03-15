const server = "https://network-speed-test-wez6.onrender.com";

/* SPEEDOMETER */

let gauge = new JustGage({
id:"gauge",
value:0,
min:0,
max:100,
title:"Download Speed",
label:"Mbps",
levelColors:["#22c55e","#f59e0b","#ef4444"]
});


/* GRAPH */

const ctx = document.getElementById("speedChart");

const chart = new Chart(ctx,{
type:"line",
data:{
labels:[],
datasets:[
{
label:"Speed Mbps",
data:[],
borderColor:"#22c55e",
tension:0.3
}
]
},
options:{
responsive:true,
animation:false,
plugins:{
legend:{display:false}
},
scales:{
x:{display:false},
y:{beginAtZero:true}
}
}
});


/* MAIN TEST */

async function startTest(){

gauge.refresh(0);

chart.data.labels=[];
chart.data.datasets[0].data=[];
chart.update();


/* PING */

let start = performance.now();

await fetch(server+"/ping");

let ping = performance.now()-start;

document.getElementById("ping").innerText =
"Ping: "+ping.toFixed(2)+" ms";


/* MULTIPLE DOWNLOAD TESTS */

let speeds=[];

for(let i=0;i<3;i++){

let speed = await runDownloadTest();

speeds.push(speed);

}


/* FINAL RESULT */

let avgSpeed =
speeds.reduce((a,b)=>a+b)/speeds.length;

document.getElementById("download").innerText =
"Download: "+avgSpeed.toFixed(2)+" Mbps";


/* AUTO SPEEDOMETER RANGE */

let range = Math.ceil(avgSpeed/50)*50;

document.getElementById("gauge").innerHTML = "";

gauge = new JustGage({
id:"gauge",
value:avgSpeed,
min:0,
max:range,
title:"Download Speed",
label:"Mbps",
levelColors:["#22c55e","#f59e0b","#ef4444"]
});


/* UPLOAD */

let uploadSpeed = await runUploadTest();

document.getElementById("upload").innerText =
"Upload: "+uploadSpeed.toFixed(2)+" Mbps";


/* SAVE RESULT */

await fetch(server+"/save",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
ping:ping,
download:avgSpeed,
upload:uploadSpeed
})

});

}


/* DOWNLOAD TEST FUNCTION */

async function runDownloadTest(){

const response = await fetch(server+"/download");

const reader = response.body.getReader();

let received=0;

let startTime=performance.now();

while(true){

const {done,value}=await reader.read();

if(done) break;

received += value.length;

let elapsed=(performance.now()-startTime)/1000;

let speed=(received*8)/(elapsed*1024*1024);

gauge.refresh(speed);

chart.data.labels.push("");
chart.data.datasets[0].data.push(speed);
chart.update();

}

let totalTime=(performance.now()-startTime)/1000;

return (received*8)/(totalTime*1024*1024);

}


/* UPLOAD TEST */

async function runUploadTest(){

const uploadSize=20*1024*1024;

const data=new Blob([new Uint8Array(uploadSize)]);

let start=performance.now();

await fetch(server+"/upload",{
method:"POST",
body:data
});

let time=(performance.now()-start)/1000;

return (uploadSize*8)/(time*1024*1024);

}