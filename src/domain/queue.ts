//circular queue created in order to store the most recent countries that have appeared in order to improve randomness
//simplified version of a queue i created in my cs class (only contains enqueue methods as there is no need to ever remove from this queue)
//just overwrites the data in the queue and no need to worry about the queue being full.
//no head variable as there no need to track this due to the simplified nature.

export class Queue{
    tail:number; //end of the queue.
    limit: number = 25; //length 25, stores up to the last 25 guesses.
    queue:Array<number>;

    constructor(queue:[Array<number>,number]| null){
        this.queue = queue? queue[0]: new Array(this.limit)
        this.tail = queue? queue[1] : 0
    }

    enqueue(countryID:number){
        this.queue[this.tail] = countryID;
        this.tail === this.limit-1? this.tail = 0: this.tail+=1; //increments the tail of the queue accoridngly
    }

    includes = (num:number) => this.queue.includes(num) //simple includes function to know if a number is inside the queue. 
}