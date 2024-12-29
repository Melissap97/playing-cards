import { Component,inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css'],
  imports: [ReactiveFormsModule, PlayingCardComponent]
})

export class MonsterComponent implements OnInit, OnDestroy {
 
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private monsterService= inject(MonsterService);
  
  private routeSubscription: Subscription | null = null;
  private formValuesSubscription : Subscription | null = null;
  private saveSubscription: Subscription | null = null;
  

  formGroup = this.fb.group({
    name:['',[Validators.required]],
    image:['',[Validators.required]],
    type: [MonsterType.ELECTRIC,[Validators.required]],
    hp:[0,[Validators.required, Validators.min(0), Validators.max(200)]],
    figureCaption:['',[Validators.required]],
    attackName: ['',[Validators.required]],
    attackStrength:[0,[Validators.required, Validators.min(0), Validators.max(200)]],
    attackDescription: ['',[Validators.required]],
  });
  
  monster: Monster = Object.assign(new Monster(), this.formGroup.value);
  monsterTypes = Object.values(MonsterType);
  monsterId= -1;

  ngOnInit(): void {
    this.formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
      this.monster = Object.assign(new Monster(), data);
    });
    this.routeSubscription = this.route.params.pipe(
      switchMap(params => {
        if (params ['monster']) {
          this.monsterId = parseInt(params ['monster']);
          return this.monsterService.get(this.monsterId);
        }
        return of(null);
      })
    ).subscribe(monster => {
        if (monster) {
          this.monster = monster;
          this.formGroup.patchValue(this.monster) 
        }
      })
    }
  

 

 ngOnDestroy(): void {
  this.formValuesSubscription?.unsubscribe();
   this.routeSubscription?.unsubscribe();
 }

 submit(event: Event) {
  event.preventDefault();
  let saveObservable = null;
  if (this.monsterId == -1) {
    saveObservable = this.monsterService.add(this.monster);
  } else {
    this.monster.id = this.monsterId;
    saveObservable = this.monsterService.update(this.monster);
  }
  this.saveSubscription = saveObservable.subscribe( _ =>{
    this.navigateBack();
  })
  
 }

 navigateBack(){
 this.router.navigate(['/home']);
 }

 isFieldValid(name:string) {
  const FormControl = this.formGroup.get(name);
  return FormControl?.invalid && (FormControl?.dirty || FormControl?.touched);
 }

 onFileChange(event: any) {
  const reader = new FileReader();
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.formGroup.patchValue({
        image: reader.result as string
      })
    };
  }
 }

}
