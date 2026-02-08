// Anatomically accurate body model matching the reference image
// Hand-traced muscle group outlines for medical accuracy

export const frontParts = [
    // HEAD - Oval with facial features outline
    {
        id: "head",
        name: "Head",
        paths: [
            "M 200 35 C 175 35 155 55 155 80 C 155 105 175 125 200 125 C 225 125 245 105 245 80 C 245 55 225 35 200 35 Z",
            // Eyes
            "M 180 75 L 185 75 M 215 75 L 220 75",
            // Nose
            "M 200 85 L 200 95",
            // Mouth
            "M 190 105 Q 200 110 210 105"
        ]
    },

    // NECK - With sternocleidomastoid muscles
    {
        id: "neck",
        name: "Neck",
        paths: [
            "M 185 125 L 180 145 L 220 145 L 215 125 Z",
            // Neck muscles
            "M 185 125 L 175 145 M 215 125 L 225 145"
        ]
    },

    // TRAPEZIUS (upper shoulders/neck)
    {
        id: "traps-front",
        name: "Trapezius",
        paths: [
            "M 175 145 L 155 155 L 165 170 L 185 165 Z",
            "M 225 145 L 245 155 L 235 170 L 215 165 Z"
        ]
    },

    // DELTOIDS (shoulders) - rounded muscle shape
    {
        id: "shoulders-left",
        name: "Left Shoulder",
        paths: [
            "M 155 155 Q 130 165 125 190 Q 125 210 135 220 L 160 205 L 165 170 Z"
        ]
    },
    {
        id: "shoulders-right",
        name: "Right Shoulder",
        paths: [
            "M 245 155 Q 270 165 275 190 Q 275 210 265 220 L 240 205 L 235 170 Z"
        ]
    },

    // PECTORALS - large chest muscles
    {
        id: "chest-left",
        name: "Left Pectoral",
        paths: [
            "M 165 170 L 185 165 L 200 170 Q 195 200 185 210 Q 175 215 165 210 L 160 205 Z"
        ]
    },
    {
        id: "chest-right",
        name: "Right Pectoral",
        paths: [
            "M 235 170 L 215 165 L 200 170 Q 205 200 215 210 Q 225 215 235 210 L 240 205 Z"
        ]
    },

    // BICEPS - upper arm muscles
    {
        id: "biceps-left",
        name: "Left Bicep",
        paths: [
            "M 135 220 Q 130 240 132 260 L 145 285 Q 150 290 155 285 L 160 260 L 160 205 Z"
        ]
    },
    {
        id: "biceps-right",
        name: "Right Bicep",
        paths: [
            "M 265 220 Q 270 240 268 260 L 255 285 Q 250 290 245 285 L 240 260 L 240 205 Z"
        ]
    },

    // FOREARMS - with muscle definition
    {
        id: "forearms-left",
        name: "Left Forearm",
        paths: [
            "M 145 285 Q 140 310 142 340 L 148 375 Q 150 382 155 380 L 160 345 L 155 285 Z"
        ]
    },
    {
        id: "forearms-right",
        name: "Right Forearm",
        paths: [
            "M 255 285 Q 260 310 258 340 L 252 375 Q 250 382 245 380 L 240 345 L 245 285 Z"
        ]
    },

    // HANDS - with finger outlines
    {
        id: "hands-left",
        name: "Left Hand",
        paths: [
            "M 148 375 L 145 395 Q 143 405 148 410 L 155 410 Q 160 405 158 395 L 155 380 Z",
            // Fingers
            "M 148 410 L 146 425 M 151 410 L 151 428 M 154 410 L 154 426"
        ]
    },
    {
        id: "hands-right",
        name: "Right Hand",
        paths: [
            "M 252 375 L 255 395 Q 257 405 252 410 L 245 410 Q 240 405 242 395 L 245 380 Z",
            // Fingers
            "M 252 410 L 254 425 M 249 410 L 249 428 M 246 410 L 246 426"
        ]
    },

    // SERRATUS (side ribs)
    {
        id: "serratus-left",
        name: "Left Serratus",
        paths: [
            "M 165 210 Q 160 220 162 235 L 170 250 L 175 235 Z"
        ]
    },
    {
        id: "serratus-right",
        name: "Right Serratus",
        paths: [
            "M 235 210 Q 240 220 238 235 L 230 250 L 225 235 Z"
        ]
    },

    // ABDOMINALS - 6-pack with clear divisions
    {
        id: "abs-upper-left",
        name: "Upper Left Abs",
        paths: [
            "M 185 210 L 200 215 L 198 235 L 183 230 Z"
        ]
    },
    {
        id: "abs-upper-right",
        name: "Upper Right Abs",
        paths: [
            "M 215 210 L 200 215 L 202 235 L 217 230 Z"
        ]
    },
    {
        id: "abs-middle-left",
        name: "Middle Left Abs",
        paths: [
            "M 183 230 L 198 235 L 197 255 L 182 250 Z"
        ]
    },
    {
        id: "abs-middle-right",
        name: "Middle Right Abs",
        paths: [
            "M 217 230 L 202 235 L 203 255 L 218 250 Z"
        ]
    },
    {
        id: "abs-lower-left",
        name: "Lower Left Abs",
        paths: [
            "M 182 250 L 197 255 L 196 275 L 181 270 Z"
        ]
    },
    {
        id: "abs-lower-right",
        name: "Lower Right Abs",
        paths: [
            "M 218 250 L 203 255 L 204 275 L 219 270 Z"
        ]
    },

    // OBLIQUES - side abs
    {
        id: "obliques-left",
        name: "Left Obliques",
        paths: [
            "M 170 250 L 175 235 L 181 270 L 176 285 Q 172 290 168 285 Z"
        ]
    },
    {
        id: "obliques-right",
        name: "Right Obliques",
        paths: [
            "M 230 250 L 225 235 L 219 270 L 224 285 Q 228 290 232 285 Z"
        ]
    },

    // GROIN/PELVIS - V-shape
    {
        id: "pelvis",
        name: "Pelvis",
        paths: [
            "M 176 285 L 181 270 L 196 275 L 200 290 L 204 275 L 219 270 L 224 285 Q 220 305 215 315 L 200 320 L 185 315 Q 180 305 176 285 Z"
        ]
    },

    // QUADRICEPS - thigh muscles with divisions
    {
        id: "quads-left-outer",
        name: "Left Outer Quad",
        paths: [
            "M 168 285 Q 165 320 167 360 L 170 450 L 175 485 Q 177 492 180 490 L 182 450 L 180 360 L 176 285 Z"
        ]
    },
    {
        id: "quads-left-inner",
        name: "Left Inner Quad",
        paths: [
            "M 185 315 L 196 275 L 200 290 L 198 360 L 195 450 L 192 485 Q 190 492 187 490 L 185 450 L 188 360 Z"
        ]
    },
    {
        id: "quads-right-inner",
        name: "Right Inner Quad",
        paths: [
            "M 215 315 L 204 275 L 200 290 L 202 360 L 205 450 L 208 485 Q 210 492 213 490 L 215 450 L 212 360 Z"
        ]
    },
    {
        id: "quads-right-outer",
        name: "Right Outer Quad",
        paths: [
            "M 232 285 Q 235 320 233 360 L 230 450 L 225 485 Q 223 492 220 490 L 218 450 L 220 360 L 224 285 Z"
        ]
    },

    // KNEES
    {
        id: "knees-left",
        name: "Left Knee",
        paths: [
            "M 175 485 L 180 490 L 187 490 L 192 485 Q 190 505 185 515 Q 180 520 175 515 Q 170 505 175 485 Z"
        ]
    },
    {
        id: "knees-right",
        name: "Right Knee",
        paths: [
            "M 225 485 L 220 490 L 213 490 L 208 485 Q 210 505 215 515 Q 220 520 225 515 Q 230 505 225 485 Z"
        ]
    },

    // CALVES - with muscle bulge
    {
        id: "calves-left",
        name: "Left Calf",
        paths: [
            "M 175 515 Q 170 540 172 570 Q 175 590 178 600 L 180 615 Q 178 620 175 620 L 172 600 Q 168 580 165 560 L 160 515 Z"
        ]
    },
    {
        id: "calves-right",
        name: "Right Calf",
        paths: [
            "M 225 515 Q 230 540 228 570 Q 225 590 222 600 L 220 615 Q 222 620 225 620 L 228 600 Q 232 580 235 560 L 240 515 Z"
        ]
    },

    // FEET - with toe details
    {
        id: "feet-left",
        name: "Left Foot",
        paths: [
            "M 175 620 L 180 615 L 185 625 L 182 640 L 165 642 L 155 640 L 152 630 L 160 622 Z",
            // Toes
            "M 165 642 L 163 650 M 170 642 L 170 651 M 175 642 L 175 650 M 180 642 L 180 649"
        ]
    },
    {
        id: "feet-right",
        name: "Right Foot",
        paths: [
            "M 225 620 L 220 615 L 215 625 L 218 640 L 235 642 L 245 640 L 248 630 L 240 622 Z",
            // Toes
            "M 235 642 L 237 650 M 230 642 L 230 651 M 225 642 L 225 650 M 220 642 L 220 649"
        ]
    }
];

export const backParts = [
    // HEAD (back view)
    {
        id: "head-back",
        name: "Head",
        paths: [
            "M 200 35 C 175 35 155 55 155 80 C 155 105 175 125 200 125 C 225 125 245 105 245 80 C 245 55 225 35 200 35 Z"
        ]
    },

    // NECK (back)
    {
        id: "neck-back",
        name: "Neck",
        paths: [
            "M 185 125 L 180 145 L 220 145 L 215 125 Z"
        ]
    },

    // TRAPEZIUS (upper back)
    {
        id: "traps",
        name: "Trapezius",
        paths: [
            "M 175 145 L 155 155 L 160 185 L 180 195 L 200 198 L 220 195 L 240 185 L 245 155 L 225 145 Z"
        ]
    },

    // DELTOIDS (back shoulders)
    {
        id: "shoulders-back-left",
        name: "Left Shoulder",
        paths: [
            "M 155 155 Q 130 165 125 190 Q 125 210 135 220 L 160 205 L 160 185 Z"
        ]
    },
    {
        id: "shoulders-back-right",
        name: "Right Shoulder",
        paths: [
            "M 245 155 Q 270 165 275 190 Q 275 210 265 220 L 240 205 L 240 185 Z"
        ]
    },

    // LATS (latissimus dorsi)
    {
        id: "lats-left",
        name: "Left Lat",
        paths: [
            "M 160 205 L 160 185 L 180 195 L 185 240 Q 183 270 180 285 L 176 285 Q 170 260 168 240 Z"
        ]
    },
    {
        id: "lats-right",
        name: "Right Lat",
        paths: [
            "M 240 205 L 240 185 L 220 195 L 215 240 Q 217 270 220 285 L 224 285 Q 230 260 232 240 Z"
        ]
    },

    // LOWER BACK (erector spinae)
    {
        id: "lower-back",
        name: "Lower Back",
        paths: [
            "M 180 195 L 200 198 L 220 195 L 220 285 L 215 240 L 200 245 L 185 240 L 180 285 Z"
        ]
    },

    // TRICEPS (back of upper arm)
    {
        id: "triceps-left",
        name: "Left Tricep",
        paths: [
            "M 135 220 L 160 205 L 160 260 L 155 285 Q 150 290 145 285 L 132 260 Z"
        ]
    },
    {
        id: "triceps-right",
        name: "Right Tricep",
        paths: [
            "M 265 220 L 240 205 L 240 260 L 245 285 Q 250 290 255 285 L 268 260 Z"
        ]
    },

    // FOREARMS (back)
    {
        id: "forearms-back-left",
        name: "Left Forearm",
        paths: [
            "M 145 285 Q 140 310 142 340 L 148 375 Q 150 382 155 380 L 160 345 L 155 285 Z"
        ]
    },
    {
        id: "forearms-back-right",
        name: "Right Forearm",
        paths: [
            "M 255 285 Q 260 310 258 340 L 252 375 Q 250 382 245 380 L 240 345 L 245 285 Z"
        ]
    },

    // HANDS (back)
    {
        id: "hands-back-left",
        name: "Left Hand",
        paths: [
            "M 148 375 L 145 395 Q 143 405 148 410 L 155 410 Q 160 405 158 395 L 155 380 Z"
        ]
    },
    {
        id: "hands-back-right",
        name: "Right Hand",
        paths: [
            "M 252 375 L 255 395 Q 257 405 252 410 L 245 410 Q 240 405 242 395 L 245 380 Z"
        ]
    },

    // GLUTES (buttocks)
    {
        id: "glutes-left",
        name: "Left Glute",
        paths: [
            "M 176 285 L 180 285 L 185 315 Q 183 340 180 360 L 175 385 Q 172 392 168 390 L 165 360 Z"
        ]
    },
    {
        id: "glutes-right",
        name: "Right Glute",
        paths: [
            "M 224 285 L 220 285 L 215 315 Q 217 340 220 360 L 225 385 Q 228 392 232 390 L 235 360 Z"
        ]
    },

    // HAMSTRINGS (back of thigh)
    {
        id: "hamstrings-left",
        name: "Left Hamstring",
        paths: [
            "M 168 390 L 175 385 L 180 360 L 182 450 L 180 490 L 175 485 L 170 450 L 165 360 Z"
        ]
    },
    {
        id: "hamstrings-right",
        name: "Right Hamstring",
        paths: [
            "M 232 390 L 225 385 L 220 360 L 218 450 L 220 490 L 225 485 L 230 450 L 235 360 Z"
        ]
    },

    // CALVES (back)
    {
        id: "calves-back-left",
        name: "Left Calf",
        paths: [
            "M 175 515 Q 170 540 172 570 Q 175 590 178 600 L 180 615 Q 178 620 175 620 L 172 600 Q 168 580 165 560 L 160 515 Z"
        ]
    },
    {
        id: "calves-back-right",
        name: "Right Calf",
        paths: [
            "M 225 515 Q 230 540 228 570 Q 225 590 222 600 L 220 615 Q 222 620 225 620 L 228 600 Q 232 580 235 560 L 240 515 Z"
        ]
    },

    // FEET (back)
    {
        id: "feet-back-left",
        name: "Left Foot",
        paths: [
            "M 175 620 L 180 615 L 185 625 L 182 640 L 165 642 L 155 640 L 152 630 L 160 622 Z"
        ]
    },
    {
        id: "feet-back-right",
        name: "Right Foot",
        paths: [
            "M 225 620 L 220 615 L 215 625 L 218 640 L 235 642 L 245 640 L 248 630 L 240 622 Z"
        ]
    }
];

// Static body outline
export const frontStaticGroups = [
    {
        id: "body-outline",
        paths: [
            // Complete body outline matching reference image
            "M 200 35 C 175 35 155 55 155 80 C 155 105 175 125 200 125 C 225 125 245 105 245 80 C 245 55 225 35 200 35",
            "M 185 125 L 180 145 Q 165 150 155 155 Q 125 170 125 190 Q 125 210 135 220 L 145 285 Q 140 310 142 340 L 148 375 L 145 395 Q 143 405 148 410 L 146 425",
            "M 215 125 L 220 145 Q 235 150 245 155 Q 275 170 275 190 Q 275 210 265 220 L 255 285 Q 260 310 258 340 L 252 375 L 255 395 Q 257 405 252 410 L 254 425",
            "M 180 145 L 176 285 Q 165 320 167 360 L 170 450 L 175 485 L 175 515 Q 170 540 172 570 Q 175 590 178 600 L 180 615 L 185 625 L 182 640 L 165 642 L 163 650",
            "M 220 145 L 224 285 Q 235 320 233 360 L 230 450 L 225 485 L 225 515 Q 230 540 228 570 Q 225 590 222 600 L 220 615 L 215 625 L 218 640 L 235 642 L 237 650",
            "M 185 315 L 200 320 L 215 315"
        ]
    }
];

export const backStaticGroups = [
    {
        id: "body-outline-back",
        paths: [
            // Same outline for back
            "M 200 35 C 175 35 155 55 155 80 C 155 105 175 125 200 125 C 225 125 245 105 245 80 C 245 55 225 35 200 35",
            "M 185 125 L 180 145 Q 165 150 155 155 Q 125 170 125 190 Q 125 210 135 220 L 145 285 Q 140 310 142 340 L 148 375 L 145 395 Q 143 405 148 410",
            "M 215 125 L 220 145 Q 235 150 245 155 Q 275 170 275 190 Q 275 210 265 220 L 255 285 Q 260 310 258 340 L 252 375 L 255 395 Q 257 405 252 410",
            "M 180 145 L 176 285 Q 165 320 167 360 L 170 450 L 175 485 L 175 515 Q 170 540 172 570 Q 175 590 178 600 L 180 615 L 185 625 L 182 640 L 165 642",
            "M 220 145 L 224 285 Q 235 320 233 360 L 230 450 L 225 485 L 225 515 Q 230 540 228 570 Q 225 590 222 600 L 220 615 L 215 625 L 218 640 L 235 642"
        ]
    }
];
