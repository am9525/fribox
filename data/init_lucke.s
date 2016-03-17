	MODULE init_lucke
	PUBLIC init_lucke
	SECTION `.text`:CODE:NOROOT(2)
	THUMB
        
init_lucke:
        push {lr}

        ; init        
 	ldr r0, =0x40020C00     // GPIOD
 	ldr r1, =0x55555555     // out (all)        
        str r1, [r0, #0x00]      // MODER
 	ldr r1, =0x0            // push-pull
        str r1, [r0, #0x04]      // OTYPER
 	ldr r1, =0x0            // low speed
        str r1, [r0, #0x08]      // SPEEDR
 	ldr r1, =0x0            // no pull
        str r1, [r0, #0x0C]      // PUPDR
        
        pop {lr}
	bx lr	

        END
