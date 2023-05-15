import { TestBed } from '@angular/core/testing';

import { AutentificazioneService } from './autentificazione.service';

describe('AutentificazioneService', () => {
  let service: AutentificazioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentificazioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
