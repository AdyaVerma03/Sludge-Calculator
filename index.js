
function calculate(){
    const iBOD = parseFloat(document.getElementById("iBOD").value);
    const iCOD = parseFloat(document.getElementById("iCOD").value);
    const iTSS = parseFloat(document.getElementById("iTSS").value);
    const iVSS = parseFloat(document.getElementById("iVSS").value);
    const iAN = parseFloat(document.getElementById("iAN").value);
    const iTN = parseFloat(document.getElementById("iTN").value);
    const iP = parseFloat(document.getElementById("iP").value);
    const tBOD = parseFloat(document.getElementById("tBOD").value);
    const tCOD = parseFloat(document.getElementById("tCOD").value);
    const tTSS = parseFloat(document.getElementById("tTSS").value);
    const tVSS = parseFloat(document.getElementById("tVSS").value);
    const tAN = parseFloat(document.getElementById("tAN").value);
    const tTN = parseFloat(document.getElementById("tTN").value);
    const tP = parseFloat(document.getElementById("tP").value);
    const Q = parseFloat(document.getElementById("Q").value);
    const So = parseFloat(document.getElementById("So").value);
    const SRT = parseFloat(document.getElementById("SRT").value);
    const Yn = parseFloat(document.getElementById("Yn").value);
    const Kdn = parseFloat(document.getElementById("Kdn").value);
    const Kdnt35 = parseFloat(document.getElementById("Kdnt35").value);
    const Yn35 = parseFloat(document.getElementById("Yn35").value);


    let bCOD = 1.6 * iBOD;
    let nbCOD = iCOD - bCOD;
    let Ks = tCOD - 1.6 * tBOD;
    let ratio = ((bCOD / iBOD) * (iBOD - tBOD)) / (iCOD - tCOD);
    let nbVSS = (1 - ratio) * iVSS;
    let rTSS = iTSS - iVSS;
    let Nox = (18 * iAN) / 14;


    //Constants
    let fd = 0.15; 
    let tempCoeff20 = 1.07;
    let tempCoeff35 = 1.2656813;
    let Kd = 0.12;
    let Kdt35 = 0.06;
    let Y = 0.4;


    let HetrotropicBioMassProduction, CellDebrisProduction, NonBiodegradableVSSinEffluent, NitryfyingBacteriBioMass;
   
    HetrotropicBioMassProduction = (Q * Y * (So - tCOD) * 0.001)/(1 + Kdt35 * SRT);
    CellDebrisProduction = (fd * Kdt35 * Q * Y * (So - Ks) * SRT * 0.001) / (1 + (Kdt35 * SRT));
    NonBiodegradableVSSinEffluent = (Q * nbVSS * 1) / 1000;
    NitryfyingBacteriBioMass = (Q * Yn35 * Nox * 0.001)/(1 + (Kdnt35 * SRT));
    
    let volumeOfTank = 34 * 34 * 5.5;

    let VolatileSolidsProduced = HetrotropicBioMassProduction + CellDebrisProduction + NonBiodegradableVSSinEffluent + NitryfyingBacteriBioMass;

    let TotalSolidsProduced = VolatileSolidsProduced / 0.7;
    
    let MLVSS, MLSS;
    MLVSS = (VolatileSolidsProduced * 1000) / volumeOfTank;
    MLSS = (TotalSolidsProduced * 1000) / volumeOfTank;
    displayResult(MLVSS, MLSS);
}

function displayResult(MLVSS, MLSS){
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h2>Result:</h2> <p>MLVSS = " + MLVSS + "</p><p>MLSS = " + MLSS + "<p>";
}