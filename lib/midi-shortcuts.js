'use babel'

import robotjs from "robotjs"

export default {
  pocketGuitar: null,
  robot: null,

  activate(state) {
    this.robot = robotjs

    this.pocketGuitar = this.findMidiInputDevice("Pocket Guitar MIDI 1").then((guitar) => {
      if(!guitar){
          // TODO Midi device not found err
          return
      }
      console.log(guitar)

      guitar.onmidimessage = (event) => {
        let str = ""
        for (var i=0; i<event.data.length; i++) {
          str += "0x" + event.data[i].toString(16) + " "
        }
        this.proceedMidiMessage(str)
      }
    })
  },

  proceedMidiMessage( message ) {
    if(message == "0x90 0x28 0x0 "){
      this.insertSnippet("if")
    } else if (message == "0x90 0x29 0x0 "){
      this.insertSnippet("for")
    }
  },

  insertSnippet (name) {
      let editor = atom.workspace.getActiveTextEditor()
      let editorView = atom.views.getView(editor)

      console.log("Insert Snipped: " + name)
      editor.insertText(name)

      atom.commands.dispatch(editorView, 'autocomplete-plus:activate').then(() => {
          setTimeout(() => {
              this.robot.keyTap('enter')
          }, 20)
      })
  },

  findMidiInputDevice(name) {
    return navigator
      .requestMIDIAccess()
      .then((midiAccess) => {
        let input
        midiAccess.inputs.forEach((currentInput) => {
          if(currentInput.name === name) input = currentInput
        })
        return input
      })
  }

};
