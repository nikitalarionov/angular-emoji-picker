import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EmojiPicker } from 'daily-emoji-picker';
import { EmojiMap, EmojiSourceFn } from 'daily-emoji-picker/dist/types';
import { EmojiData } from 'daily-emoji-picker/src/ts/types';

@Component({
  selector: 'lib-emoji-picker',
  template: `
    <div #container></div>
  `
})
export class EmojiPickerComponent<T extends EmojiMap> implements OnInit {
  @Input() source: EmojiSourceFn<T>;
  @Input() activeGroup?: string;
  @Output() onSelect: EventEmitter<EmojiData>;
  @ViewChild('container') container: ElementRef;

  constructor() { }

  ngOnInit() {
    const emojiBlock = new EmojiPicker(this.container.nativeElement, {
      source: this.source,
      defaultActiveGroup: this.activeGroup,
      onSelect: this.onSelected
    });
    emojiBlock.init();
  }

  onSelected(data: EmojiData): void {
    this.onSelect.emit(data);
  }

}
