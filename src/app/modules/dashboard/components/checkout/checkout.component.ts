import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {UserService} from '../../../core/services/user.service';
declare var stripe: any;
declare var Stripe: any;
declare var elements: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardInfo', {static: false}) cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  stripe: any;
  elements: any;
  plans;
  selectedPlan =  new FormControl();



  constructor(private cd: ChangeDetectorRef, private userService: UserService) {
    this.stripe = Stripe(environment.stripeApiKey); // use your test publishable key
    this.elements = this.stripe.elements();
    this.plans = this.userService.getPlans();
    this.plans.subscribe((plans)=>{
      this.selectedPlan.setValue(plans[1].planId);
    })
  }

  ngAfterViewInit() {
    this.card = this.elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();

  }
  comparePlans(plan1, plan2){
    if(plan1 === environment.defaultPlan){
      return plan1;
    }
  }
  async subscribe(form: NgForm) {
    const plan = this.selectedPlan.value;

    const { token, error } = await this.stripe.createToken(this.card);
    console.log(token)
    if (error) {
      console.log('Something is wrong:', error);
    } else {

      this.userService
        .createSubscription(token.id, plan)
        .subscribe((done) => {

      }, (err) => {

      });
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
    }
  }
}
