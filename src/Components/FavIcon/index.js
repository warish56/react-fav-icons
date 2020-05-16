import React from 'react';



const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
class FavIcon extends React.PureComponent{

    constructor(props){
        super(props);
        this.link = null;
        this.degree = 5;
        this.fill = true;
        this.prevLink = null;
        this.stopped = false;
        this.canvas;
        this.translated = false;
    }

    componentDidMount(){
        this.createCanvas();

        if(this.props.loading){
        this.createLink();
        this.createLoader();
        }

        if(this.props.text){
            this.createLink();
            this.createNotification();
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.loading !== this.props.loading){
            const {loading} = this.props;
                if(loading){
                    this.stopped = false;
                    this.createLink();
                    this.createLoader()
                }else{
                    this.stopped = true;
                    this.removeLink();
                }
        }

        if(prevProps.text !== this.props.text){

            if(this.props.text){
            this.createLink();
            this.createNotification();
            }else{
                this.removeLink();
            }
        }
    }

    createCanvas = () => {

        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', CANVAS_WIDTH);
        canvas.setAttribute('height', CANVAS_HEIGHT);
        this.canvas = canvas;
    }


  

    createLoader = () => {
        if(this.stopped){
            return;
        }
        const context = this.canvas.getContext('2d');

        context.lineWidth = 50;
        if(this.degree > 360){
            this.degree=0;
            // this.fill = !this.fill;
            // context.strokeStyle = 'white';
        }


        context.strokeStyle= this.fill ? "#569de3" : 'white';

        const radius = Math.floor(CANVAS_WIDTH * 0.35);
        const newAngle = (Math.PI/180)* this.degree;

        context.beginPath();

        if(!this.translated){
        context.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
        this.translated = true;
        }
        context.arc(0, 0, radius,0, newAngle);
        context.rotate((Math.PI/180)* 10);
        context.stroke();



         this.degree += 2


        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        this.link.href = this.canvas.toDataURL('image/png')
        requestAnimationFrame(this.createLoader);

       
    }

    createNotification = () => {

        const {text=''} = this.props;

        if(!text){
            return;
        }


        const strLength = text.length;

        if(strLength > 3){
            return;
        }

        const context = this.canvas.getContext('2d'); //this.canvas.getContext('2d');


        //ADDING IMAGE
        

        var img = new Image();
        img.setAttribute('crossorigin', "anonymous")
        img.src =  this.prevLink.href; 

        img.onload = () => {
            context.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        

        //  drawing circle

        context.fillStyle =  '#de342f';

        const circleWidth = 350;

        const radius = Math.floor(circleWidth * (strLength > 1 ? ( strLength > 2 ?0.6: 0.45) : 0.4) );
        const newAngle = (Math.PI/180)* 360;

        context.beginPath();
        context.arc(CANVAS_WIDTH* (strLength > 2 ? 0.5 : 0.7), CANVAS_HEIGHT * (strLength > 2 ? 0.5 : 0.7), radius,0, newAngle);
        context.fill();
   


        // drawing text



        context.fillStyle =  '#ffffff';
        context.font = `800 ${strLength > 1 ? (strLength > 2 ? 240: 250) : 300}px sans-serif`
        context.fillText(text, CANVAS_WIDTH * (strLength > 1 ? ( strLength > 2 ? 0.10 :0.42)  : 0.58), CANVAS_HEIGHT *(strLength > 1 ?  (strLength > 2 ? 0.7 :0.88)  : 0.90));

        this.link.href = this.canvas.toDataURL('image/png')   //this.canvas.toDataURL('image/png')

        }
    }



    createLink = () => {
        const links = document.getElementsByTagName('link');
        for(let i=0; i<links.length; i++){

            if(links[i].rel === 'shortcut icon' || links[i].rel === 'icon' || links[i].rel === 'favicon' || links[i].rel === 'apple-touch-icon'){
                this.prevLink = links[i];
                break;
            }
        }
        document.head.removeChild(this.prevLink);
        const linkElem = document.createElement('link');
        this.link = linkElem;
        linkElem.setAttribute('rel', 'icon');
        linkElem.setAttribute('href', this.prevLink.href);
        document.head.appendChild(linkElem);
    }

    removeLink = () => {
        if(this.link){
        document.head.removeChild(this.link);
        document.head.appendChild(this.prevLink);
        this.link = null;
        }
    }

    render(){
        const {children} = this.props
        return children;
    }
}

export default FavIcon;