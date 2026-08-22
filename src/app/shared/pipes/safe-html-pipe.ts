import {inject, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  sanitizer = inject(DomSanitizer);

  transform(value: string | undefined): SafeHtml {
    return value ? this.sanitizer.bypassSecurityTrustHtml(value) : '';
  }

}
