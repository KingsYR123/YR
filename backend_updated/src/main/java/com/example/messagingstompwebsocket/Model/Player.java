package com.example.messagingstompwebsocket.Model;

public class Player {

    private String name;

    private double score;

    private int playBoard[][];

    private int max, max_x, max_y;

    public Player() {
        playBoard= new int[4][4];
    }

    public Player(String name, double score,int playBoard[][]) {
        this.playBoard=new int[4][4];
        for(int i=0;i<4;i++)
            for(int j=0;j<4;j++)
                this.playBoard[i][j]=playBoard[i][j];
        this.name = name;
        this.score = score;
    }

    public void setPlayBoard(int [][] arr){
        for(int i=0;i<4;i++)
            for(int j=0;j<4;j++)
                playBoard[i][j]=arr[i][j];
    }

    public int[][] getPlayBoard() {
        int[][] res=new int[4][4];
        for(int i=0;i<4;i++)
            for(int j=0;j<4;j++)
                res[i][j]=playBoard[i][j];
        return res;
    }

    public String getScore() {
        return String.valueOf(score);
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMax() {
        return max;
    }

    public int[] getMaxPos() {
        int[] Pos=new int[2];
        Pos[0] = max_x;
        Pos[1] = max_y;
        return Pos;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public void setMaPos(int max_x, int max_y) {
        this.max_x = max_x;
        this.max_y = max_y;
    }

}