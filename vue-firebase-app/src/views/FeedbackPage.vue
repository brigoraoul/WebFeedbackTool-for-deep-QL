<template>
  <div class="Feedback">
    <h1>Give Feedback</h1>
  
    <v-card 
      class="mx-auto my-5"
      max-width="1100"
      elevation="8">

    <v-card-text>Which image shows the more efficient way to the goal?</v-card-text>

      <v-row
        align="center"
        class="my-6"
      >
        <img
          class="mx-12"
          height="380"
          width="485"
          :src="leftPicture"
        >
        <img
          class="mx-2"
          height="380"
          width="485"
          :src="rightPicture"
        >
      </v-row>

      <v-btn
          color="green accent-1"
          class="mb-8"
          @click="next(true)"
          elevation="2"
          x-large
        >Left Image</v-btn>
      <v-btn
          color="green accent-1"
          class="ml-16 mb-8"
          @click="next(false)"
          elevation="2"
          
        >Right Image</v-btn>
   
    </v-card>

    <p> {{ decisionTimes }} </p>
    <p> {{ correctlyChosen }} </p>

  </div>
</template>

<script>
import { writeDecisionTimesToDB, writeDecisionsToDB } from '../firebase/firebase'
import { DataBus } from '../components/dataBus'

export default {
  name: 'Feedback',
  data() {
    return {
      pictures: [],
      numberOfFeedbacks: 19,
      leftPicture: 0,
      rightPicture: 0,
      decisionTimes: [],
      imageCounter: 0,
      startTime: 0,
      endTime: 0,
      indices: [],
      rightShorter: [],
      correctlyChosen: []
    }
  },
  beforeMount() {
      this.pictures = require("../imagePaths/imagePaths")
      this.rightShorter = require("../imagePaths/upperShorter")
      this.leftPicture = this.pictures[0],
      this.rightPicture = this.pictures[1],
      this.startTime = new Date().getTime()
  },
  methods: {
    next(leftChosen) {
      //measure time
      this.endTime = new Date().getTime()
      const t = this.endTime - this.startTime
      this.decisionTimes[this.imageCounter] = t
      this.startTime = new Date().getTime()

      //check whether the user chose correctly
      if( (leftChosen && !this.rightShorter[this.imageCounter]) || !leftChosen && this.rightShorter[this.imageCounter] ) {
        this.correctlyChosen.push(true)
      } else {
        this.correctlyChosen.push(false)
      }

      DataBus.decisionTimes = this.decisionTimes
      DataBus.correctlyChosen = this.correctlyChosen
      
      //check if last image and if so reroute to end page and store information to DB
      if (this.imageCounter == this.numberOfFeedbacks) {
        const id = new Date().getTime()
        this.decisionTimes.push(id)
        this.correctlyChosen.push(id)
        writeDecisionTimesToDB(this.decisionTimes)
        writeDecisionsToDB(this.correctlyChosen)
        this.decisionTimes.pop()
        this.correctlyChosen.pop()

        //transfer information to end page component
        DataBus.id = id

        this.$router.push({ path:'finish' })
      }

      //change images
      this.imageCounter = this.imageCounter + 1
      this.leftPicture = this.pictures[this.imageCounter * 2]
      this.rightPicture = this.pictures[this.imageCounter * 2 + 1 ]

    }
  }
}
</script>
