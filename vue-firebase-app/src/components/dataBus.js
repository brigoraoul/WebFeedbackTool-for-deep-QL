// the simple purpose of this class class is to transfer data between the three site components
// without having to use an external library, because event buses are not supported for Vue3 anymore.
export class DataBus {

    static id = 0
    static decisionTimes = []
    static correctlyChosen = []
}