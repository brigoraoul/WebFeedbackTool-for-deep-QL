<template>
  <div class="endPage">
    <h1>Thank you for giving feedback to the rl agent!</h1>

    <v-card
      class="mx-auto my-5"
      max-width="800"
      elevation="8">

       <v-row
          justify="space-between"  
          class="mx-6 mt-6"
          width="100"
        >
          <v-card-text>
            On a scale from 1 to 10, how hard did you find it to give feedback?
            <p></p>
            (1 = very easy, 10 = very hard)
          </v-card-text>

          <v-text-field
            v-model="cognitiveCostRating"
          
          ></v-text-field>

          <v-btn
            class="mx-5"
            icon="mdi-checkbox-marked-circle"
            color="green accent-1"
            @click="submitCognitiveCost"
          />
       </v-row>

       <v-card-text>
            You can see your results below. The numbers indicate how much time you spent thinking for each image.
       </v-card-text>

    </v-card>

    <p> {{ decisionTimes }} </p>
    <p> {{ correctlyChosen }} </p>

    <router-link 
        :to="'/'"
        style="text-decoration: none; color: inherit;">
      <v-btn
          color="green accent-1"
          class="ma-10"
          elevation="2"
          x-large
        >Back to start
      </v-btn>
    </router-link>
    
  </div>
</template>

<script>
import { writeCognitiveCostToDB } from "../firebase/firebase"
import { DataBus } from '../components/dataBus'

export default ({
  name: 'EndPage',
  data() {
    return {
      cognitiveCostRating: null,
      decisionTimes: [],
      correctlyChosen: [],
      id: 0
    }
  },
  beforeMount() {
    this.decisionTimes = DataBus.decisionTimes
    this.correctlyChosen = DataBus.correctlyChosen
    this.id = DataBus.id
  },
  methods: {
    submitCognitiveCost() {
      if(this.cognitiveCostRating <= 10 && this.cognitiveCostRating >= 0 && this.cognitiveCostRating != null) {
        writeCognitiveCostToDB([this.cognitiveCostRating, this.id])
        this.cognitiveCostRating = null
      }
    }
  }

})
</script>