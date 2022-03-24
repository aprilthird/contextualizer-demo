var Contextualize = Contextualize || {};
Contextualize.buttons = Contextualize.buttons || {};
Contextualize.map = Contextualize.map || {};
Contextualize.marker = Contextualize.marker || {};

Contextualize.timeOut = function (ms) {
    return () => new Promise(resolve => setTimeout(resolve, ms));
}

Contextualize.setDocumentTitle = function (title) {
    document.title = title;
};

Contextualize.showAlert = function (title, message, type) {
    console.warn(type);
    if (message) {
        Swal.fire(title, message, type);
    }
    else {
        Swal.fire({ title: title, icon: type });
    }
}

Contextualize.confirm = function (title, message, confirmText, type) {
    return new Promise((resolve) => {
        Swal.fire({
            title: title,
            text: message,
            icon: type,
            showCancelButton: true,
            confirmButtonText: confirmText,
            cancelButtonText: "Cancelar",
            customClass: {
                confirmButton: "btn btn-brand-primary"
            }
        }).then((result) => {
            if (result.value) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
}

Contextualize.confirmAsync = function (title, message, confirmText = "Sí") {
    return new Promise((resolve) => {
        Swal.fire({
            title: title,
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: confirmText,
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            customClass: {
                confirmButton: "btn-brand-primary"
            },
            preConfirm: () => {
                resolve(true);
                return Promise.resolve().then(Contextualize.timeOut(200000));
            }
        }).then((result) => {
            if (result.value) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
}

Contextualize.createLaddaButton = function (buttonId) {
    Contextualize.buttons[buttonId] = Ladda.create(document.querySelectorAll(`#btn_${buttonId}`)[0]);
}

Contextualize.showLaddaLoader = function (buttonId) {
    Contextualize.buttons[buttonId].start();
}

Contextualize.hideLaddaLoader = function (buttonId) {
    Contextualize.buttons[buttonId].stop();
}

Contextualize.getCurrentLocation = function () {
    return new Promise((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({ IsEnabled: true, HasError: false, Latitude: position.coords.latitude, Longitude: position.coords.longitude });
            }, (error) => {
                    resolve({ IsEnabled: true, HasError: true, ErrorMessage: error.message, ErrorCode: error.code });
            });
        }
        else {
            resolve({ IsEnabled: false });
        }
    });
}

Contextualize.initGoogleMaps = function (geocodeInputReference) {
    var latlng = new google.maps.LatLng(40.716948, -74.003563);
    var options = {
        zoom: 14, center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), options);
    map.addListener("idle", () => {
        if (Contextualize.marker["marker"]) {
            Contextualize.marker["marker"].setMap(null);
        }
        var center = map.getCenter();
        Contextualize.marker["marker"] = new google.maps.Marker({
            position: center,
            map,
            title: "Your Position",
        });
        if (geocodeInputReference) {
            fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.64a8b45db7f2e9ed69b95373a37fc2f6&lat=${center.lat()}&lon=${center.lng()}&format=json`)
                .then(response => response.json())
                .then(data => {
                    console.log(data.display_name);
                    var element = document.getElementById(geocodeInputReference);
                    element.value = data.display_name;
                    var event = new Event('change');
                    element.dispatchEvent(event);
                });
        }
    });
    Contextualize.marker["marker"] = new google.maps.Marker({
        position: latlng,
        map,
        title: "Your Position",
    });
    Contextualize.map["map"] = map;
}

Contextualize.initCharts = function () {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(Contextualize.drawCharts);
}

Contextualize.drawCharts = function () {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Total'],
        ['Translated', 11],
        ['Reviewed', 6],
        ['Contextualized', 4]
    ]);

    var options = {
        title: 'My Activity'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);

    var data1 = google.visualization.arrayToDataTable([
        ['Month', 'Translated', 'Reviewed', 'Contextualized'],
        ['January', 3, 2, 1],
        ['February', 2, 1, 2],
        ['March', 5, 3, 1],
        ['April', 1, 0, 0]
    ]);

    var options1 = {
        title: 'My Performance',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart1 = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart1.draw(data1, options1);

}

Contextualize.geocoderByLatLng = function (lat, lng) {
    return new Promise((resolve) => {
        if (google) {
            if (google.maps) {
                if (google.maps.Geocoder) {
                    const geocoder = new google.maps.Geocoder();
                    const latlng = {
                        lat: lat,
                        lng: lng
                    };
                    geocoder.geocode(
                        {
                            location: latlng
                        },
                        (results, status) => {
                            if (status === "OK") {
                                if (results[0]) {
                                    resolve({ IsEnabled: true, HasError: false, Found: true, Address: results[0].formatted_address });
                                } else {
                                    resolve({ IsEnabled: true, HasError: false, Found: false });
                                }
                            } else {
                                resolve({ IsEnabled: true, HasError: true, ErrorMessage: status });
                            }
                        }
                    );
                }
                else {
                    resolve({ IsEnabled: false });
                }
            }
            else {
                resolve({ IsEnabled: false });
            }
        }
        else {
            resolve({ IsEnabled: false });
        }
    });
}

Contextualize.saveAsFile = function(fileName, fileType, byteBase64) {
    var link = document.createElement("a");
    link.download = fileName;
    link.href = fileType + byteBase64;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

Contextualize.prepareLayout = function () {
    document.getElementById("app").classList.remove("vh-100");
    document.getElementById("app").classList.remove("vw-100");
    document.getElementById("app").classList.remove("bg-black");
    document.getElementById("app").classList.remove("d-flex");
    document.getElementById("app").classList.remove("justify-content-center");
    document.getElementById("app").classList.remove("align-items-center");
}

Contextualize.initParticles = function (elementId) {

    let color = '#fff';
    let maxParticles = 150;

    // ParticlesJS Config.
    var particlesConfig = {
        'particles': {
            'number': {
                'value': maxParticles,
                'density': {
                    'enable': true,
                    'value_area': 800
                }
            },
            'color': {
                'value': color
            },
            'shape': {
                'type': 'circle',
                'stroke': {
                    'width': 0,
                    'color': '#000000'
                },
                'polygon': {
                    'nb_sides': 5
                },
            },
            'opacity': {
                'value': 0.5,
                'random': false,
                'anim': {
                    'enable': false,
                    'speed': 1,
                    'opacity_min': 0.1,
                    'sync': false
                }
            },
            'size': {
                'value': 3,
                'random': true,
                'anim': {
                    'enable': false,
                    'speed': 40,
                    'size_min': 0.1,
                    'sync': false
                }
            },
            'line_linked': {
                'enable': true,
                'distance': 150,
                'color': color,
                'opacity': 1,
                'width': 1
            },
            'move': {
                'enable': true,
                'speed': 2,
                'direction': 'none',
                'random': false,
                'straight': false,
                'out_mode': 'out',
                'bounce': false,
                'attract': {
                    'enable': false,
                    'rotateX': 600,
                    'rotateY': 1200
                }
            }
        },
        'interactivity': {
            'detect_on': 'canvas',
            'events': {
                'onhover': {
                    'enable': true,
                    'mode': 'grab'
                },
                'onclick': {
                    'enable': true,
                    'mode': 'push'
                },
                'resize': true
            },
            'modes': {
                'grab': {
                    'distance': 140,
                    'line_linked': {
                        'opacity': 1
                    }
                },
                'bubble': {
                    'distance': 400,
                    'size': 40,
                    'duration': 2,
                    'opacity': 8,
                    'speed': 3
                },
                'repulse': {
                    'distance': 200,
                    'duration': 0.4
                },
                'push': {
                    'particles_nb': 4
                },
                'remove': {
                    'particles_nb': 2
                }
            }
        },
        'retina_detect': true
    };

    particlesJS(elementId, particlesConfig);
}