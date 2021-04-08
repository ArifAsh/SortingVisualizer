import React from 'react';
import "./sortingVis.css";

export default class Sorter extends React.Component {
    constructor(props) { 
        super(props);
        this.state={
            bars: [],
            solved: true,
            solving: false
        };
    }
    componentDidMount(){
        this.makeArr();
    }
    makeArr() {
    if (this.state.solving===false){
    const bars = [];
    let num = document.getElementById("myRange").value;
    for (let i=0; i<num; i++){
        bars.push(Math.floor(Math.random() * 625) + 5 ) ;
     
    }
    this.setState({bars});
    let solved = false;
    this.setState({solved})
    }}

    async quickSort(arr,start,end) {
        
        if (start >= end){
            return;
        }
        await sleep(10)
        let new_index =  await this.partition(arr,start,end);
        this.setState({bars:arr})
        await sleep(10)
        await this.quickSort(arr,start,new_index-1);
        this.setState({bars:arr})
        await sleep(10)
        await this.quickSort(arr,new_index+1,end);
        this.setState({bars:arr})
       
        
    }
    async insertionSort(arr){
        for (let i=1; i<arr.length;i++){
            document.getElementById(i).id = "green";
            
            let key = arr[i];
            let hole=i;
            while (hole>=0 && arr[hole-1]>key){
                arr[hole]=arr[hole-1];
                hole--;
                
                this.setState({arr})
                if (document.getElementById(hole)){
                document.getElementById(hole).id = "red";
                await sleep(1)
                if (document.getElementById("red")){
                document.getElementById("red").id = hole;
                }
            }}
            if (document.getElementById("green")){
            document.getElementById("green").id = i;
            }
            arr[hole] = key;
          
            }
        return
    }

    async bubbleSort(arr){
        let flag;
        for (let i = 0; i <arr.length ; i++){
            flag = 0;
            
            for (let k = 0; k<arr.length-i-1 ; k++){
                if (document.getElementById(arr.length-i)){
                document.getElementById(arr.length-i).id = "green";}
                if (arr[k] > arr[k+1]){
                    if (document.getElementById(k)){
                    document.getElementById(k).id = "red";}
                    await this.swap(arr,k,k+1)
            
                    this.setState({bars:arr})
                    flag = 1;
                }
                if (document.getElementById("red")){
                    document.getElementById("red").id = k;
                }
                if (document.getElementById("green")){
                document.getElementById("green").id = arr.length-i;}
            }
            
            if (flag === 0){
                return;
            }
        }
    }
    async mergeSort(arr) {
        let len = arr.length
        if (len < 2){
            return;
        }
        const auxArr = arr.slice();
        await this.mergeHelp(arr,0,len-1,auxArr);
        this.setState({bar:arr});
    
    }

    async solver(sorter){
        if (!this.state.solving && !this.state.solved){
            this.setState({solving:true})
            if (sorter==="insertion"){
                await this.insertionSort(this.state.bars)
            }else if (sorter==="quickSort"){
                await this.quickSort(this.state.bars,0,this.state.bars.length-1);
            }else if (sorter==="bubbleSort"){
                await this.bubbleSort(this.state.bars)
            }else if (sorter==="mergeSort"){
                await this.mergeSort(this.state.bars)
            }
        
        
 
        this.setState({solved:true})
        this.setState({solving:false})
        }
    }
    

    render(){
    const {bars} = this.state;
    let width;
    if (bars.length>130){
        width = 1;
    }else if (bars.length>100){
        width = 1.75;
    }else if(bars.length> 50){
        width = 3;
    }else if(bars.length>20){
        width = 10;
    }else if(bars.length>10){
        width = 50;
    }else {
        width = 80;
    }

    return (
        <div>
        <nav>
        Sorting Visualizer
        <input type="range" min="10" max="200" className="slider" id="myRange" defaultValue="100" onClick={()=>this.makeArr()}></input>
        </nav>
        <span className="line"></span>
        <div className="array-container">
           {bars.map((number,index) => (
               <div className="array-bar" name={index} key={index} id={index} 
               style={{height:`${number}px`, width: `${width}px`}}></div>
           ))}
        </div>
        <footer>
        <span className="line"></span>
        <button onClick={()=>this.makeArr()} id="newArr">Generate New Array</button>
        <button id="quickSort" onClick={()=>this.solver("quickSort")}>Quick Sort</button>
        <button id="insertionSort" onClick={()=>this.solver("insertion")}>Insertion Sort</button>
        <button id="bubbleSort" onClick={()=>this.solver("bubbleSort")}>Bubble Sort</button>
        <button id="mergeSort" onClick ={() => this.solver("mergeSort")}>Merge Sort</button>
        </footer>
        </div>
    );
}
// Helper functions
async partition(arr,start,end) {
  
    let partitionI = start;
    let pivot = arr[end];
    await sleep(20)
    document.getElementById(end).id = "green";
    document.getElementById(partitionI).id = "blue"
    for (let i = start; i < end ; i++){
        if (arr[i] < pivot){
            if (document.getElementById(i)){
            document.getElementById(i).id = "red";}
            
            await this.swap(arr,partitionI,i)
            
            if (document.getElementById("red")){
            document.getElementById("red").id = i;}

            if(document.getElementById("blue")){
            document.getElementById("blue").id = partitionI;}
            partitionI++
            
            if (document.getElementById(partitionI)){
            document.getElementById(partitionI).id = "blue";}
        }
    }
    await this.swap(arr,partitionI,end);
    document.getElementById("green").id = end
    if(document.getElementById("blue")){
        document.getElementById("blue").id = partitionI;}
    return partitionI
}
async swap(arr,x,y){
    await sleep(5);
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
    this.setState({bars:arr})
}

async mergeHelp(arr,start,end,aux){
    if (start===end){
        return;
    }
    const mid = Math.floor((start+end)/2);
    await this.mergeHelp(aux,start,mid,arr);
    await this.mergeHelp(aux,mid+1,end,arr);
    await sleep(5)
    await this.merge(arr,start,mid,end,aux);
   
}

async merge(arr,start,mid,end,aux){
    let i= start;
    let j = mid+1;
    let k = start;
    if(document.getElementById(i)){
        document.getElementById(i).id = "red";}
    if(document.getElementById(j)){
        document.getElementById(j).id = "blue";}
    this.setState({bar:arr});
    while (i <= mid && j <= end){
        if (aux[i] <= aux[j]){
            if(document.getElementById("red")){
                document.getElementById("red").id = i;}
            
            await sleep(15)
            arr[k++] = aux[i++];
            if(document.getElementById(i)){
                document.getElementById(i).id = "red";}
            
        }else{
            if (document.getElementById("blue")){
                document.getElementById("blue").id = j;}
            await sleep(15)
            arr[k++] = aux[j++];
            if(document.getElementById(j)){
                document.getElementById(j).id = "blue";}
            
        }
        this.setState({bar:arr});
    }
    
    if(document.getElementById("red")){
        document.getElementById("red").id = i;}
    if (document.getElementById("blue")){
        document.getElementById("blue").id = j;}
    while (i <= mid){
        if (document.getElementById(i)){
        document.getElementById(i).id = "red";}
       
        await sleep(15)
        if (document.getElementById("red")){
            document.getElementById("red").id = i;}
        arr[k++]= aux[i++];
        this.setState({bar:arr});
       
    }
    while (j<= end){
 
        if (document.getElementById(j)){
        document.getElementById(j).id = "blue";}
        
        
        await sleep(15)
        if (document.getElementById("blue")){
            document.getElementById("blue").id = j;}
        arr[k++] = aux[j++];
        this.setState({bar:arr});
        
    }
  
}
}




function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
