// TSRBench Leaderboard Table Configuration

// Color formatter for cells
var colorFormatter = function (cell, formatterParams) {
    var value = cell.getValue();
    
    if (value === "-" || value === null || value === undefined) {
        return value;
    }
    
    var field = cell.getField();
    
    // Define base colors for different categories
    var baseColors = {
        // Perception: PR, NU, AD, SA
        'PR': { r: 211, g: 225, b: 196 },
        'NU': { r: 211, g: 225, b: 196 },
        'AD': { r: 211, g: 225, b: 196 },
        'SA': { r: 211, g: 225, b: 196 },
        // Reasoning: ER, CD, AR, TR, NR, DR, IR
        'ER': { r: 202, g: 220, b: 235 },
        'CD': { r: 202, g: 220, b: 235 },
        'AR': { r: 202, g: 220, b: 235 },
        'TR': { r: 202, g: 220, b: 235 },
        'NR': { r: 202, g: 220, b: 235 },
        'DR': { r: 202, g: 220, b: 235 },
        'IR': { r: 202, g: 220, b: 235 },
        // Prediction: TSF, EP
        'TSF': { r: 245, g: 203, b: 145 },
        'EP': { r: 245, g: 203, b: 145 },
        // Decision: QualDM, QuantDM
        'QualDM': { r: 208, g: 191, b: 218 },
        'QuantDM': { r: 208, g: 191, b: 218 }
    };
    
    var defaults = {
        min: 0.0,
        max: 100.0,
        startColor: { r: 255, g: 255, b: 255 },
        endColor: baseColors[field] || { r: 144, g: 238, b: 144 }
    };
    
    var min = formatterParams.min !== undefined ? formatterParams.min : defaults.min;
    var max = formatterParams.max !== undefined ? formatterParams.max : defaults.max;
    var startColor = formatterParams.startColor || defaults.startColor;
    var endColor = formatterParams.endColor || defaults.endColor;
    
    var percent = (value - min) / (max - min);
    percent = Math.max(0, Math.min(1, percent));
    
    var r = Math.round(startColor.r + percent * (endColor.r - startColor.r));
    var g = Math.round(startColor.g + percent * (endColor.g - startColor.g));
    var b = Math.round(startColor.b + percent * (endColor.b - startColor.b));
    
    cell.getElement().style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    
    return value;
};

// Special formatter for Overall column with progress bar effect
var overallFormatter = function (cell, formatterParams) {
    var value = cell.getValue();
    
    if (value === "-" || value === null || value === undefined) {
        return value;
    }
    
    var min = formatterParams.min !== undefined ? formatterParams.min : 0.0;
    var max = formatterParams.max !== undefined ? formatterParams.max : 100.0;
    
    var percent = (value - min) / (max - min);
    percent = Math.max(0, Math.min(1, percent));
    
    // Calculate color intensity - from light bronze to dark bronze
    var lightBronze = { r: 222, g: 184, b: 135 };  // Light bronze/tan
    var darkBronze = { r: 139, g: 90, b: 0 };      // Dark bronze/gold
    
    var r = Math.round(lightBronze.r + percent * (darkBronze.r - lightBronze.r));
    var g = Math.round(lightBronze.g + percent * (darkBronze.g - lightBronze.g));
    var b = Math.round(lightBronze.b + percent * (darkBronze.b - lightBronze.b));
    
    var barColor = `rgb(${r}, ${g}, ${b})`;
    var percentWidth = percent * 100;
    
    // Create a progress bar with color gradient
    cell.getElement().style.background = `linear-gradient(to right, ${barColor} ${percentWidth}%, white ${percentWidth}%)`;
    cell.getElement().style.fontWeight = "bold";
    
    return value;
};

// Fetch and render the main TSRBench table
fetch('website/data/tsrbench_results.json')
    .then(response => response.json())
    .then(data => {
        var table = new Tabulator("#tsrbench-main-table", {
            data: data,
            layout: "fitData",
            responsiveLayout: false,
            pagination: false,
            height: "auto",
            initialSort: [
                { column: "overall", dir: "desc" }
            ],
            columns: [
                {
                    title: "Model",
                    field: "model",
                    frozen: true,
                    width: 280,
                    headerSort: true,
                    formatter: function(cell) {
                        var value = cell.getValue();
                        var rowData = cell.getData();
                        var category = rowData.category || "";
                        
                        // Add category badge
                        var badge = "";
                        if (category === "Proprietary") {
                            badge = '<span style="background: #659bd7ff; color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px; margin-right: 8px;">Proprietary</span>';
                        } else if (category === "Open-source LLM") {
                            badge = '<span style="background: #7ac292ff; color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px; margin-right: 8px;">LLM</span>';
                        } else if (category === "Open-source VLM") {
                            badge = '<span style="background: #de8888ff; color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px; margin-right: 8px;">VLM</span>';
                        } else if (category === "TSLLM") {
                            badge = '<span style="background: #b98fc9ff; color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px; margin-right: 8px;">TSLLM</span>';
                        }
                        
                        return badge + value;
                    }
                },
                {
                    title: "Perception",
                    headerHozAlign: "center",
                    columns: [
                        { title: "PR", field: "PR", width: 60, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } },
                        { title: "NU", field: "NU", width: 60, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } },
                        { title: "AD", field: "AD", width: 60, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } },
                        { title: "SA", field: "SA", width: 60, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } }
                    ]
                },
                {
                    title: "Reasoning",
                    headerHozAlign: "center",
                    columns: [
                        { title: "ER", field: "ER", width: 60, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } },
                        { title: "CD", field: "CD", width: 60, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } },
                        { title: "AR", field: "AR", width: 60, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } },
                        { title: "TR", field: "TR", width: 60, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } },
                        { title: "NR", field: "NR", width: 60, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } },
                        { title: "DR", field: "DR", width: 60, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } },
                        { title: "IR", field: "IR", width: 60, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } }
                    ]
                },
                {
                    title: "Prediction",
                    headerHozAlign: "center",
                    columns: [
                        { title: "TSF", field: "TSF", width: 65, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } },
                        { title: "EP", field: "EP", width: 60, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } }
                    ]
                },
                {
                    title: "Decision",
                    headerHozAlign: "center",
                    columns: [
                        { title: "QualDM", field: "QualDM", width: 100, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } },
                        { title: "QuantDM", field: "QuantDM", width: 110, hozAlign: "center", formatter: colorFormatter, formatterParams: { min: 0, max: 100 } }
                    ]
                },
                {
                    title: "Overall",
                    field: "overall",
                    width: 90,
                    hozAlign: "center",
                    formatter: overallFormatter,
                    formatterParams: { 
                        min: 0, 
                        max: 100
                    }
                }
            ]
        });
    })
    .catch(error => console.error('Error loading TSRBench data:', error));
