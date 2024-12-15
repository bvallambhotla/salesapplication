import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';

export function withSpinner<T>(spinnerService: SpinnerService): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) => {
    spinnerService.show();
    return source.pipe(
      finalize(() => spinnerService.hide())
    );
  };
}
