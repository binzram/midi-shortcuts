'use babel';

import MidiShortcuts from '../lib/midi-shortcuts';

describe('MidiShortcuts', () => {
  let workspaceElement;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
  });

  describe('when the midi-shortcuts:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      expect(workspaceElement.querySelector('.midi-shortcuts')).not.toExist();

      runs(() => {
        expect(workspaceElement.querySelector('.midi-shortcuts')).toExist();
      });
    });
  });
});
