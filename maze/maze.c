#include <stdio.h>
#include <stdlib.h>

#define WIDTH 50
#define HEIGHT 50

typedef struct {
    int set; // L'ID del set a cui appartiene la cella
    int walls; // Bitmask per i muri: 1 = su, 2 = destra, 4 = giù, 8 = sinistra
} Cell;

Cell maze[HEIGHT][WIDTH];

void initializeMaze() {
    for (int y = 0; y < HEIGHT; y++) {
        for (int x = 0; x < WIDTH; x++) {
            maze[y][x].set = y * WIDTH + x + 1; // Assegna un ID unico a ogni cella
            maze[y][x].walls = 15; // Inizialmente, ogni cella è circondata da muri
        }
    }
}

void printMaze() {
    for (int y = 0; y < HEIGHT; y++) {
        for (int x = 0; x < WIDTH; x++) {
            // Stampa un '+' solo se la cella è completamente circondata da muri
            printf(maze[y][x].walls == 15 ? "+" : " ");
        }
        printf("\n");
    }
}





int main() {
    initializeMaze();
    printMaze(); // Stampa il labirinto
    return 0;
}
