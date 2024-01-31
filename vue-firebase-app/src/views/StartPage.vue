<template>
  <div class="startPage">

    <h1>Welcome to the RL feedback tool</h1>

    <v-card 
      class="mx-auto my-5"
      max-width="800"
      elevation="8">

      <v-card-text>
        You will be shown images that depict sequences from the training of a reinforcement learning agent. 
        The images show the agent's environment, where the agent is represented by a
        small red dot in the lower left corner and the agent's goal is represented by a bigger green dot in the
        upper right corner. A red line shows one of the paths the agent has tried during training.
        <p></p>
        Once you click the start button below, you will always see two images next to each other, like shown below. 
        Both images display the same environment but different paths to the goal. Your task is to choose which image shows the more
        efficient path, assuming the agent moves with constant speed. So, basically, which image shows the shorter
        red line?
      </v-card-text>

      <v-img
        height="200"
        src="../assets/startPageImage.png"
      ></v-img>

      <v-card-text>
        Your "decision times" 
        - the times from the moment two images appear on your screen, until the moment you press one of the feedback buttons -
        will be measured and stored. 
        In order to increase the quality of the data, please do not make any pauses while giving feedback.
        Also, please try to concentrate and only give feedback when you are at least somewhat certain which path is shorter.
      </v-card-text>

    </v-card>

    <router-link 
        :to="'/feedback'"
        style="text-decoration: none; color: inherit;">
      <v-btn
          color="green accent-1"
          text
          elevation="2"
          x-large
        >Start
      </v-btn>
    </router-link>

  </div>
</template>

<script>
//import { createDecisionTimes } from '../firebase/config'
export default {
 name: 'StartPage',
 data() {
   return {
     time: 100
   }
 },
 methods: {
  store() {
     this.time = 300
     //this.time = createDecisionTimes({time: this.time})
     
   }
 } 
}
</script>