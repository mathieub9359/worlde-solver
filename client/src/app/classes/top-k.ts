import { MinPriorityQueue } from '@datastructures-js/priority-queue'
import { GuessEntropy } from '../interfaces/guess-entropy';


export class GuessEntropyTopK {
    private kValue = 0;
    private readonly priorityQueue = new MinPriorityQueue<GuessEntropy>((guess => guess.entropy));

    public constructor(kValue: number) {
        this.kValue = kValue;
    }

    public getTopK(): GuessEntropy[] {
        return this.priorityQueue.toArray();    
    }

    public add(guess: GuessEntropy) {
        if(this.priorityQueue.size() < this.kValue) {
            this.priorityQueue.enqueue(guess);
        } else if(guess.entropy > (this.priorityQueue.front()?.entropy ?? 0)) {
            this.priorityQueue.dequeue();
            this.priorityQueue.enqueue(guess);
        }
    }
}