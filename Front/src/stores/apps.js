import { ref } from 'vue'

export const apps = ref({
    "Administrator": {
        settings: {
            icon: "Admin",
            minSize: {
                x: 402, // false si désactivé (qd même 100x100px)
                y: 480
            },
            barColor: '#000',
            textColor: 'rgb(255, 72, 0)',
            content : "adminComp",
        }
    },
    "RefineryCalc": {
        settings: {
            icon: "icon_spoty",
            minSize: {
                x: 850,
                y: 500
            },
            barColor: '#455f78',
            textColor: false,
            content: "iFrame",
            props: {
                url: "http://outofspace.fr/RafineryCalcJs/",
            }
        }
    },
    "Minecraft": {
        settings: {
            icon: "minecraft-icon",
            minSize: {
                x: false,
                y: false
            },
            barColor: "#004800",
            textColor: false,
            content: "iFrame",
            props: {
                url: "https://minecraft.fandom.com/wiki/Minecraft_Wiki",
            }
        }    
    }
});